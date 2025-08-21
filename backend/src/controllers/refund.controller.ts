// src/controllers/refund.controller.ts
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma";
import { logKeyEvents } from "../utils/keyEvents";

const REFUND_WINDOW_MS = Number(
  process.env.REFUND_WINDOW_MS ?? 24 * 60 * 60 * 1000
);

function isUuidLike(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    s
  );
}

/**
 * POST /api/purchase/dev/refund/:idOrNumber
 * Условия:
 * - order.status === 'paid'
 * - в заказе НЕТ подписок
 * - НЕТ активированных алиасов (ни один code не активирован)
 * - укладываемся в окно REFUND_WINDOW_MS
 * Идемпотентно: повторный вызов для уже refunded → 200 refunded:true
 */
export const devRefund: RequestHandler = async (req, res) => {
  const { idOrNumber } = req.params as { idOrNumber: string };

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 0) Поставим advisory lock на этот идентификатор, чтобы не было гонок по одному заказу
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${idOrNumber}), 42)`;

      // 1) Находим заказ
      const order = isUuidLike(idOrNumber)
        ? await tx.orders.findUnique({
            where: { id: idOrNumber },
            include: {
              items: {
                include: {
                  units: {
                    include: {
                      key_alias: {
                        select: {
                          id: true,
                          activated: true,
                          product_key_id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          })
        : await tx.orders.findFirst({
            where: { order_number: idOrNumber },
            include: {
              items: {
                include: {
                  units: {
                    include: {
                      key_alias: {
                        select: {
                          id: true,
                          activated: true,
                          product_key_id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

      if (!order) throw new Error("ORDER_NOT_FOUND");

      // Идемпотентность
      if (order.status === "refunded") {
        return {
          orderId: order.id,
          orderNumber: order.order_number,
          status: "refunded",
          refunded: true,
        };
      }
      if (["pending", "awaiting_payment", "paid"].includes(order.status)) {
        // разрешаем откат
      } else {
        return res.status(400).json({ message: "REFUND_NOT_ALLOWED_STATUS" });
      }

      // Окно возврата
      const ageMs =
        Date.now() - new Date(order.created_at ?? Date.now()).getTime();
      if (ageMs > REFUND_WINDOW_MS) throw new Error("REFUND_WINDOW_EXPIRED");

      // Запрет: если есть подписки
      const hasSubscriptions = order.items.some(
        (it) => it.item_type === "subscription"
      );
      if (hasSubscriptions) throw new Error("REFUND_CONTAINS_SUBSCRIPTIONS");

      // Собираем алиасы/ключи из юнитов
      const aliasIds: string[] = [];
      const keyIds: string[] = [];
      const aliasPerItem: Array<{
        order_item_id: string;
        alias_id: string | null;
        key_id: string | null;
      }> = [];

      for (const it of order.items) {
        for (const u of it.units) {
          const a = u.key_alias;
          aliasPerItem.push({
            order_item_id: it.id,
            alias_id: a?.id ?? null,
            key_id: a?.product_key_id ?? null,
          });
          if (a) {
            if (a.activated) throw new Error("REFUND_NOT_ELIGIBLE_ACTIVATED");
            aliasIds.push(a.id);
            if (a.product_key_id) keyIds.push(a.product_key_id);
          }
        }
      }

      // 2) Возврат ключей в пул и выключение алиасов
      if (keyIds.length > 0) {
        await tx.product_keys.updateMany({
          where: { id: { in: keyIds } },
          data: {
            used: false,
            reserved_by_order_id: null,
            reserved_until: null,
          },
        });
      }
      if (aliasIds.length > 0) {
        await tx.keys_aliases.updateMany({
          where: { id: { in: aliasIds } },
          data: { active: false, purchased: false, updated_at: new Date() },
        });
      }

      // 3) Аудит
      await logKeyEvents(
        tx,
        aliasPerItem.map((x) => ({
          event: x.alias_id ? "alias_deactivated" : "refunded",
          order_id: order.id,
          order_item_id: x.order_item_id,
          alias_id: x.alias_id ?? undefined,
          product_key_id: x.key_id ?? undefined,
          details: { reason: "refund", manual: true },
        }))
      );
      // финальный «refunded» на уровень заказа
      await logKeyEvents(tx, [
        { event: "refunded", order_id: order.id, details: { scope: "order" } },
      ]);

      // 4) Меняем статус заказа
      await tx.orders.update({
        where: { id: order.id },
        data: { status: "refunded" },
      });

      return {
        orderId: order.id,
        orderNumber: order.order_number,
        status: "refunded",
        refunded: true,
      };
    });

    res.json(result);
  } catch (e: any) {
    console.error(e);
    const map: Record<string, string> = {
      ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
      REFUND_NOT_ALLOWED_STATUS: "REFUND_NOT_ALLOWED_STATUS",
      REFUND_WINDOW_EXPIRED: "REFUND_WINDOW_EXPIRED",
      REFUND_CONTAINS_SUBSCRIPTIONS: "REFUND_CONTAINS_SUBSCRIPTIONS",
      REFUND_NOT_ELIGIBLE_ACTIVATED: "REFUND_NOT_ELIGIBLE_ACTIVATED",
    };
    res.status(400).json({ message: map[e?.message] ?? "REFUND_ERROR" });
  }
};
