// src/controllers/purchase.controller.ts
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma";
import { randomInt } from "crypto";
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

// ===========================================
// ================ CHECKOUT =================
// ===========================================
/**
 * POST /api/purchase/checkout
 * Создаёт заказ в статусе pending, резервирует ключи и пишет key_events:reserved
 */
export const checkout: RequestHandler = async (req, res) => {
  const { userId, items } = req.body as { userId: string; items: CartItem[] };
  if (!userId || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: "userId и items обязательны" });
    return;
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 0) Advisory lock на пользователя — запрет параллельных чекаутов
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${userId}), 0)`;

      // 1) Создаём заказ с рандомным order_number (строка), с ретраями на уникальность
      let order: { id: string; order_number: string } | undefined;
      for (let attempt = 1; attempt <= 10; attempt++) {
        const candidate = genOrderNumber(7);
        try {
          order = await tx.orders.create({
            data: {
              user_id: userId,
              status: "pending",
              order_number: candidate,
            },
            select: { id: true, order_number: true },
          });
          break;
        } catch (err: any) {
          if (err?.code !== "P2002") throw err; // не конфликт уникальности — пробрасываем
        }
      }
      if (!order) throw new Error("ORDER_NUMBER_GEN_FAILED");

      // 2) Общие данные для лимита
      const now = new Date();
      const pendingOrders = await tx.orders.findMany({
        where: { user_id: userId, status: "pending" },
        select: { id: true },
      });
      const pendingOrderIds = pendingOrders.map((o) => o.id);

      // 3) Добавляем позиции и резервируем ключи
      for (const it of items) {
        if (it.type === "product") {
          const qty = Math.max(1, Math.floor(it.qty ?? 1));

          const prod = await tx.products.findUnique({
            where: { id: it.productId },
            select: { id: true },
          });
          if (!prod) throw new Error("PRODUCT_NOT_FOUND");

          // Анти-хоардинг — сколько уже зарезервировано этим юзером по продукту
          const userReservedNow = await tx.product_keys.count({
            where: {
              product_id: it.productId,
              used: false,
              reserved_by_order_id: { in: pendingOrderIds },
              reserved_until: { gt: now },
            },
          });
          if (userReservedNow + qty > MAX_PER_PRODUCT_PER_USER) {
            throw new Error("USER_LIMIT_REACHED");
          }

          // Создаём order_item и юниты
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

          // Резервим ключи FIFO + SKIP LOCKED
          const rows = await tx.$queryRaw<Array<{ id: string }>>`
            SELECT id
            FROM product_keys
            WHERE product_id = ${it.productId}::uuid
              AND used = false
              AND (reserved_until IS NULL OR reserved_until < now())
            ORDER BY created_at ASC, id ASC
            FOR UPDATE SKIP LOCKED
            LIMIT ${Number(qty)}
          `;
          if (rows.length !== qty) throw new Error("NO_STOCK");

          await tx.product_keys.updateMany({
            where: { id: { in: rows.map((r) => r.id) } },
            data: {
              reserved_by_order_id: order.id,
              reserved_until: new Date(Date.now() + RESERVE_TTL_MS),
            },
          });

          // LOG: reserved
          await logKeyEvents(
            tx,
            rows.map((r) => ({
              event: "reserved",
              product_key_id: r.id,
              order_id: order!.id,
              order_item_id: oi.id,
            }))
          );
        }

        if (it.type === "subscription") {
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
