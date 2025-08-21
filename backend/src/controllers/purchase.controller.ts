// src/controllers/purchase.controller.ts
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma";
import { createHash, randomInt } from "crypto";
import { safeDecryptKey } from "../utils/safeKey";
import { logKeyEvents } from "../utils/keyEvents";

// ---------- Конфиг анти-хоардинга ----------
const RESERVE_TTL_MS = Number(process.env.RESERVE_TTL_MS ?? 5 * 60 * 1000); // 5 минут
const MAX_PER_PRODUCT_PER_USER = Number(
  process.env.MAX_PER_PRODUCT_PER_USER ?? 3
); // одновременно в pending на 1 продукт

// ---------- Типы ----------
type CartItem =
  | { type: "product"; productId: string; qty: number }
  | { type: "subscription"; subscriptionId: string; qty?: number };

// ---------- Утилиты ----------
function genOrderNumber(len = 7): string {
  let s = "";
  for (let i = 0; i < len; i++) s += String(randomInt(0, 10));
  return s; // ведущие нули сохраняем
}

function makeCartHash(items: CartItem[]): string {
  // нормализуем: p:<id>:<qty> / s:<id>:1; сортируем и хешируем
  const norm = items.map((it) =>
    it.type === "product"
      ? `p:${it.productId}:${Math.max(1, Math.floor(it.qty ?? 1))}`
      : `s:${it.subscriptionId}:1`
  );
  norm.sort();
  const raw = norm.join("|");
  return createHash("sha256").update(raw).digest("hex").slice(0, 64);
}

// ===========================================
// ================ CHECKOUT =================
// ===========================================
/**
 * POST /api/purchase/checkout
 * Создаёт заказ в статусе pending, резервирует ключи и пишет key_events:reserved
 */
export const checkout: RequestHandler = async (req, res) => {
  const { userId, items, promoCode } = req.body as {
    userId: string;
    items: CartItem[];
    promoCode?: string;
  };
  if (!userId || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: "userId и items обязательны" });
    return;
  }

  const cartHash = makeCartHash(items);

  try {
    const result = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${userId}), 0)`;

      // 0) Пытаемся найти активный заказ с тем же составом
      const existing = await tx.orders.findFirst({
        where: {
          user_id: userId,
          status: { in: ["pending", "awaiting_payment"] },
          cart_hash: cartHash,
        },
        select: { id: true, order_number: true, status: true },
      });
      if (existing) {
        // опционально — обновим снапшот промо, если пришёл явный promoCode и его ещё нет
        if (promoCode) {
          const promo = await tx.promocodes.findFirst({
            where: { code: promoCode },
            select: { id: true, type: true, denomination: true, code: true },
          });
          const usage = promo
            ? await tx.promo_usage.findFirst({
                where: { user_id: userId, promocode_id: promo.id },
              })
            : null;

          if (promo && usage && promo.type === "discount") {
            await tx.orders.update({
              where: { id: existing.id },
              data: {
                applied_promocode_id: promo.id,
                applied_promocode_code: promo.code,
                applied_promocode_type: promo.type,
                applied_promocode_denomination: Number(promo.denomination),
              },
            });
          }
        }

        return existing;
      }

      // 1) Создаём заказ
      let order: { id: string; order_number: string } | undefined;
      for (let attempt = 1; attempt <= 10; attempt++) {
        const candidate = genOrderNumber(7);
        try {
          order = await tx.orders.create({
            data: {
              user_id: userId,
              status: "pending",
              order_number: candidate,
              cart_hash: cartHash,
            },
            select: { id: true, order_number: true },
          });
          break;
        } catch (err: any) {
          if (err?.code !== "P2002") throw err;
        }
      }
      if (!order) throw new Error("ORDER_NUMBER_GEN_FAILED");

      // 2) Строки + юниты
      for (const it of items) {
        if (it.type === "product") {
          const qty = Math.max(1, Math.floor(it.qty ?? 1));
          const prod = await tx.products.findUnique({
            where: { id: it.productId },
            select: { id: true },
          });
          if (!prod) throw new Error("PRODUCT_NOT_FOUND");

          const oi = await tx.order_items.create({
            data: {
              order_id: order.id,
              item_type: "product",
              product_id: it.productId,
              qty,
            },
          });
          for (let i = 0; i < qty; i++) {
            await tx.order_item_units.create({
              data: { order_item_id: oi.id },
            });
          }
        } else if (it.type === "subscription") {
          const sub = await tx.subscriptions.findUnique({
            where: { id: it.subscriptionId },
            select: { id: true },
          });
          if (!sub) throw new Error("SUBSCRIPTION_NOT_FOUND");
          await tx.order_items.create({
            data: {
              order_id: order.id,
              item_type: "subscription",
              subscription_id: it.subscriptionId,
              qty: 1,
            },
          });
        }
      }

      // 3) Если передан promoCode — сразу снапшотим в заказ (не считаем сумму здесь)
      if (promoCode) {
        const promo = await tx.promocodes.findFirst({
          where: { code: promoCode },
          select: { id: true, type: true, denomination: true, code: true },
        });
        const usage = promo
          ? await tx.promo_usage.findFirst({
              where: { user_id: userId, promocode_id: promo.id },
            })
          : null;

        if (promo && usage && promo.type === "discount") {
          await tx.orders.update({
            where: { id: order.id },
            data: {
              applied_promocode_id: promo.id,
              applied_promocode_code: promo.code,
              applied_promocode_type: promo.type,
              applied_promocode_denomination: Number(promo.denomination),
            },
          });
        }
      }

      return order;
    });

    res.json({
      orderId: result.id,
      orderNumber: result.order_number,
      status: "pending",
    });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ message: e?.message || "CHECKOUT_ERROR" });
  }
};

// ===========================================
// ================ ACTIVATE =================
// ===========================================
/**
 * POST /api/purchase/activate
 * { code, userId } → помечает alias как activated, создаёт запись в user_products и отдаёт расшифрованный ключ.
 */
export const activate: RequestHandler = async (req, res) => {
  const { code, userId } = req.body as { code: string; userId: string };
  if (!code || !userId) {
    res.status(400).json({ message: "code и userId обязательны" });
    return;
  }

  try {
    const out = await prisma.$transaction(async (tx) => {
      // Захватываем alias и убеждаемся, что он принадлежит заказу этого юзера
      const rows = await tx.$queryRaw<
        Array<{
          id: string;
          product_key_id: string;
          order_user_id: string;
          order_id: string;
        }>
      >`
        SELECT ka.id, ka.product_key_id, o.user_id AS order_user_id, o.id AS order_id
        FROM keys_aliases ka
        JOIN order_item_units u ON u.key_alias_id = ka.id
        JOIN order_items oi ON oi.id = u.order_item_id
        JOIN orders o ON o.id = oi.order_id
        WHERE ka.code = ${code}
          AND ka.active = true
          AND ka.activated = false
        FOR UPDATE SKIP LOCKED
      `;
      if (rows.length === 0) throw new Error("INVALID_OR_USED");

      const alias = rows[0];
      if (alias.order_user_id !== userId) throw new Error("FORBIDDEN_ALIAS");

      await tx.keys_aliases.update({
        where: { id: alias.id },
        data: { activated: true, activated_at: new Date() },
      });

      // LOG: activated
      await logKeyEvents(tx, [
        {
          event: "activated",
          product_key_id: alias.product_key_id,
          alias_id: alias.id,
          order_id: alias.order_id,
        },
      ]);

      const pk = await tx.product_keys.findUnique({
        where: { id: alias.product_key_id },
        select: { product_id: true, key_encrypted: true },
      });
      if (!pk?.product_id) throw new Error("KEY_NOT_BOUND_TO_PRODUCT");

      await tx.user_products.create({
        data: {
          user_id: userId,
          product_id: pk.product_id,
          product_key_id: alias.product_key_id,
        },
      });

      const decryptedKey = safeDecryptKey(pk.key_encrypted);
      return { productId: pk.product_id, key: decryptedKey };
    });

    res.json(out);
  } catch (e: any) {
    console.error(e);
    const msg =
      e?.message === "FORBIDDEN_ALIAS"
        ? "Этот код привязан к другому пользователю"
        : e?.message || "ACTIVATE_ERROR";
    res.status(400).json({ message: msg });
  }
};
