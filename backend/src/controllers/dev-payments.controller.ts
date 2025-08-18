// src/controllers/dev-payments.controller.ts
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma";
import { logKeyEvents } from "../utils/keyEvents";

// ---------- utils ----------
function isUuidLike(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    s
  );
}
function genAliasCode(): string {
  const digits = Array.from({ length: 18 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return [
    digits.slice(0, 2),
    digits.slice(2, 6),
    digits.slice(6, 10),
    digits.slice(10, 14),
    digits.slice(14, 18),
  ].join("-");
}
function isPayableStatus(s: string) {
  return s === "pending" || s === "awaiting_payment";
}

// ===========================================
// ========== DEV: CREATE PAYMENT ============
// ===========================================
/**
 * POST /api/purchase/dev/create-payment/:idOrNumber
 * Переводит pending → awaiting_payment, считает amount, задаёт provider_order_id = DEV-XXXXXXX
 */
export const devCreatePayment: RequestHandler = async (req, res) => {
  const { idOrNumber } = req.params as { idOrNumber: string };

  try {
    const out = await prisma.$transaction(async (tx) => {
      const order = isUuidLike(idOrNumber)
        ? await tx.orders.findUnique({
            where: { id: idOrNumber },
            include: { items: true },
          })
        : await tx.orders.findFirst({
            where: { order_number: idOrNumber },
            include: { items: true },
          });

      if (!order) throw new Error("ORDER_NOT_FOUND");
      if (order.status === "paid") {
        return {
          orderId: order.id,
          orderNumber: order.order_number,
          status: "paid",
        };
      }
      if (!isPayableStatus(order.status))
        throw new Error("ORDER_STATUS_NOT_PAYABLE");

      // уже есть «сессия»
      if (order.status === "awaiting_payment" && order.provider_order_id) {
        return {
          orderId: order.id,
          orderNumber: order.order_number,
          status: order.status,
          providerOrderId: order.provider_order_id,
          amount: order.amount ? Number(order.amount) : 0,
          currency: order.currency ?? "RUB",
        };
      }

      // посчитать сумму по строкам
      let amount = 0;
      for (const it of order.items) {
        if (it.item_type === "product" && it.product_id) {
          const p = await tx.products.findUnique({
            where: { id: it.product_id },
            select: { price: true },
          });
          amount += Number(p?.price ?? 0) * it.qty;
        }
        if (it.item_type === "subscription" && it.subscription_id) {
          const s = await tx.subscriptions.findUnique({
            where: { id: it.subscription_id },
            select: { price: true },
          });
          amount += Number(s?.price ?? 0) * it.qty;
        }
      }

      const providerOrderId = `DEV-${order.order_number}`;
      const updated = await tx.orders.update({
        where: { id: order.id },
        data: {
          status: "awaiting_payment",
          provider_order_id: providerOrderId,
          amount,
          updated_at: new Date(),
        },
        select: {
          id: true,
          order_number: true,
          status: true,
          provider_order_id: true,
          amount: true,
          currency: true,
        },
      });

      return {
        orderId: updated.id,
        orderNumber: updated.order_number,
        status: updated.status,
        providerOrderId: updated.provider_order_id,
        amount: Number(updated.amount ?? 0),
        currency: updated.currency ?? "RUB",
      };
    });

    res.json(out);
  } catch (e: any) {
    const map: Record<string, string> = {
      ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
      ORDER_STATUS_NOT_PAYABLE: "ORDER_STATUS_NOT_PAYABLE",
    };
    res
      .status(400)
      .json({ message: map[e?.message] ?? "CREATE_PAYMENT_ERROR" });
  }
};

// ===========================================
// ================ DEV: PAY =================
// ===========================================
/**
 * POST /api/purchase/dev/pay/:idOrNumber
 * Имитация успешной оплаты: списывает зарезервированные ключи, создаёт алиасы, статус = paid.
 */
export const devPay: RequestHandler = async (req, res) => {
  const { idOrNumber } = req.params as { idOrNumber: string };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const order = isUuidLike(idOrNumber)
        ? await tx.orders.findUnique({
            where: { id: idOrNumber },
            include: { items: { include: { units: true } } },
          })
        : await tx.orders.findFirst({
            where: { order_number: idOrNumber },
            include: { items: { include: { units: true } } },
          });

      if (!order) throw new Error("ORDER_NOT_FOUND");

      // Идемпотентность
      if (order.status === "paid") {
        const units = await tx.order_item_units.findMany({
          where: { order_item: { order_id: order.id } },
          include: {
            key_alias: { select: { code: true } },
            order_item: { select: { id: true, product_id: true } },
          },
        });

        const aliases = units
          .filter((u) => u.key_alias)
          .map((u) => ({
            code: u.key_alias!.code,
            productId: u.order_item.product_id!,
            orderItemId: u.order_item.id,
          }));

        return {
          orderId: order.id,
          orderNumber: order.order_number,
          status: "paid",
          aliases,
        };
      }

      if (!isPayableStatus(order.status))
        throw new Error("ORDER_STATUS_NOT_PAYABLE");
      if (order.status === "pending") {
        await tx.orders.update({
          where: { id: order.id },
          data: { status: "awaiting_payment", updated_at: new Date() },
        });
      }

      const created: Array<{
        code: string;
        productId: string;
        orderItemId: string;
      }> = [];

      for (const it of order.items) {
        if (it.item_type === "product" && it.product_id) {
          // Берём зарезервированные этим заказом ключи
          const reserved = await tx.product_keys.findMany({
            where: {
              reserved_by_order_id: order.id,
              product_id: it.product_id,
            },
            take: it.qty,
            select: { id: true },
          });
          if (reserved.length < it.qty) throw new Error("RESERVE_MISMATCH");

          for (const pk of reserved) {
            // Помечаем used и снимаем резерв
            await tx.product_keys.update({
              where: { id: pk.id },
              data: {
                used: true,
                reserved_by_order_id: null,
                reserved_until: null,
              },
            });

            // LOG: paid (списали ключ)
            await logKeyEvents(tx, [
              {
                event: "paid",
                product_key_id: pk.id,
                order_id: order.id,
                order_item_id: it.id,
              },
            ]);

            // Генерим alias с ретраями на P2002
            let aliasCode = "";
            let aliasId = "";
            for (;;) {
              aliasCode = genAliasCode();
              try {
                const life = await tx.products.findUnique({
                  where: { id: it.product_id },
                  select: { life_duration: true },
                });
                const alias = await tx.keys_aliases.create({
                  data: {
                    product_key_id: pk.id,
                    code: aliasCode,
                    purchased: true,
                    activated: false,
                    active: true,
                    active_days: life?.life_duration ?? null,
                  },
                  select: { id: true, code: true },
                });
                aliasId = alias.id;

                // LOG: alias_created
                await logKeyEvents(tx, [
                  {
                    event: "alias_created",
                    product_key_id: pk.id,
                    alias_id: aliasId,
                    order_id: order.id,
                    order_item_id: it.id,
                  },
                ]);
                break;
              } catch (err: any) {
                if (err?.code !== "P2002") throw err;
              }
            }

            // Прикрепляем alias к свободному unit строки
            const freeUnit = await tx.order_item_units.findFirst({
              where: { order_item_id: it.id, key_alias_id: null },
              select: { id: true },
            });
            if (freeUnit) {
              await tx.order_item_units.update({
                where: { id: freeUnit.id },
                data: { key_alias_id: aliasId },
              });
            }

            created.push({
              code: aliasCode,
              productId: it.product_id,
              orderItemId: it.id,
            });
          }
        }

        if (it.item_type === "subscription" && it.subscription_id) {
          // Автоактивация подписки (как раньше)
          const sub = await tx.subscriptions.findUnique({
            where: { id: it.subscription_id },
          });
          if (!sub) throw new Error("SUB_NOT_FOUND");

          const now = new Date();
          const days = Number(sub.duration_days);

          const activeExisting = await tx.user_subscriptions.findFirst({
            where: {
              user_id: order.user_id,
              subscription_id: it.subscription_id,
              active: true,
              end_date: { gt: now },
            },
          });

          if (activeExisting) {
            await tx.user_subscriptions.update({
              where: { id: activeExisting.id },
              data: {
                end_date: new Date(
                  activeExisting.end_date.getTime() + days * 86400 * 1000
                ),
              },
            });
          } else {
            await tx.user_subscriptions.create({
              data: {
                user_id: order.user_id,
                subscription_id: it.subscription_id,
                start_date: now,
                end_date: new Date(now.getTime() + days * 86400 * 1000),
                active: true,
              },
            });
          }
        }
      }

      await tx.orders.update({
        where: { id: order.id },
        data: { status: "paid" },
      });

      return {
        orderId: order.id,
        orderNumber: order.order_number,
        status: "paid",
        aliases: created,
      };
    });

    res.json(result);
  } catch (e: any) {
    console.error(e);
    const map: Record<string, string> = {
      ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
      ORDER_STATUS_NOT_PAYABLE: "ORDER_STATUS_NOT_PAYABLE",
      RESERVE_MISMATCH: "RESERVE_MISMATCH",
      SUB_NOT_FOUND: "SUB_NOT_FOUND",
    };
    res.status(400).json({ message: map[e?.message] ?? "PAY_ERROR" });
  }
};
