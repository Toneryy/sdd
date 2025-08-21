// src/controllers/dev-payments.controller.ts
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import { logKeyEvents } from "../utils/keyEvents";

const RESERVE_TTL_MS = Number(process.env.RESERVE_TTL_MS ?? 5 * 60 * 1000);
const MAX_PER_PRODUCT_PER_USER = Number(
  process.env.MAX_PER_PRODUCT_PER_USER ?? 3
);

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
const round2 = (n: number) => Math.round(n * 100) / 100;

/** Бронирование ключей под заказ (вызываем при создании платёжной сессии и/или перед pay). */
async function ensureReservations(
  tx: Prisma.TransactionClient,
  orderId: string
) {
  const order = await tx.orders.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) throw new Error("ORDER_NOT_FOUND");

  const now = new Date();

  // Список заказов пользователя в awaiting_payment — они уже держат резервы
  const awaiting = await tx.orders.findMany({
    where: { user_id: order.user_id, status: "awaiting_payment" },
    select: { id: true },
  });
  const awaitingIds = awaiting.map((o) => o.id);

  for (const it of order.items) {
    if (it.item_type !== "product" || !it.product_id) continue;

    // Сколько уже зарезервировано этим юзером по этому продукту в его других сессиях
    const userReservedNow = awaitingIds.length
      ? await tx.product_keys.count({
          where: {
            product_id: it.product_id,
            used: false,
            reserved_by_order_id: { in: awaitingIds },
            reserved_until: { gt: now },
          },
        })
      : 0;

    if (userReservedNow + it.qty > MAX_PER_PRODUCT_PER_USER) {
      throw new Error("USER_LIMIT_REACHED");
    }

    // Сколько уже зарезервировано именно этим заказом
    const alreadyByThisOrder = await tx.product_keys.count({
      where: {
        product_id: it.product_id,
        used: false,
        reserved_by_order_id: order.id,
        reserved_until: { gt: now },
      },
    });

    const need = it.qty - alreadyByThisOrder;
    if (need <= 0) continue;

    // Резерв FIFO + SKIP LOCKED
    const rows = await tx.$queryRaw<Array<{ id: string }>>`
      SELECT id
      FROM product_keys
      WHERE product_id = ${it.product_id}::uuid
        AND used = false
        AND (reserved_until IS NULL OR reserved_until < now())
      ORDER BY created_at ASC, id ASC
      FOR UPDATE SKIP LOCKED
      LIMIT ${Number(need)}
    `;
    if (rows.length !== need) throw new Error("NO_STOCK");

    await tx.product_keys.updateMany({
      where: { id: { in: rows.map((r) => r.id) } },
      data: {
        reserved_by_order_id: order.id,
        reserved_until: new Date(Date.now() + RESERVE_TTL_MS),
      },
    });

    await logKeyEvents(
      tx,
      rows.map((r) => ({
        event: "reserved",
        product_key_id: r.id,
        order_id: order.id,
        order_item_id: it.id,
      }))
    );
  }
}

/** Посчитать subtotal, выбрать лучший дисконт из promo_usage, зафиксировать снапшот. */
async function computeAndSnapshotAmount(
  tx: Prisma.TransactionClient,
  orderId: string
) {
  const order = await tx.orders.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) throw new Error("ORDER_NOT_FOUND");

  // 1) subtotal
  let subtotal = 0;
  for (const it of order.items) {
    if (it.item_type === "product" && it.product_id) {
      const p = await tx.products.findUnique({
        where: { id: it.product_id },
        select: { price: true },
      });
      subtotal += Number(p?.price ?? 0) * it.qty;
    }
    if (it.item_type === "subscription" && it.subscription_id) {
      const s = await tx.subscriptions.findUnique({
        where: { id: it.subscription_id },
        select: { price: true },
      });
      subtotal += Number(s?.price ?? 0) * it.qty;
    }
  }

  // 2) Определяем скидку:
  //    - если в заказе уже есть снапшот промокода — используем его (только type=discount)
  //    - иначе берём лучший discount из promo_usage и СНАПШОТИМ его в заказ.
  let discountPercent = 0;
  let snapData: {
    id: string;
    code: string;
    type: string;
    denomination: number;
  } | null = null;

  if (
    order.applied_promocode_type === "discount" &&
    typeof order.applied_promocode_denomination === "number"
  ) {
    discountPercent = order.applied_promocode_denomination;
    // ничего не перезаписываем — уже зафиксировано
  } else {
    const usages = await tx.promo_usage.findMany({
      where: { user_id: order.user_id },
      include: {
        promocodes: {
          select: { id: true, code: true, type: true, denomination: true },
        },
      },
    });

    const discountCandidates = usages
      .map((u) => u.promocodes)
      .filter(
        (
          p
        ): p is {
          id: string;
          code: string;
          type: string;
          denomination: number;
        } => !!p && p.type === "discount"
      );

    for (const p of discountCandidates) {
      if (!snapData || Number(p.denomination) > Number(snapData.denomination)) {
        snapData = {
          id: p.id,
          code: p.code,
          type: p.type,
          denomination: Number(p.denomination),
        };
      }
    }

    discountPercent = snapData?.denomination ?? 0;

    if (snapData) {
      // Сохраняем снимок промо в заказ
      await tx.orders.update({
        where: { id: order.id },
        data: {
          applied_promocode_id: snapData.id,
          applied_promocode_code: snapData.code,
          applied_promocode_type: snapData.type,
          applied_promocode_denomination: snapData.denomination,
        },
      });
    }
  }

  const amount_subtotal = round2(subtotal);
  const amount_total = round2(subtotal * (1 - discountPercent / 100));
  const discount_amount = round2(amount_subtotal - amount_total);

  const providerOrderId =
    order.provider_order_id ?? `DEV-${order.order_number}`;

  const updated = await tx.orders.update({
    where: { id: order.id },
    data: {
      status: "awaiting_payment",
      provider_order_id: providerOrderId,
      amount: amount_total,
      amount_subtotal,
      discount_percent: discountPercent,
      discount_amount,
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
}

// ===========================================
// ========== DEV: CREATE PAYMENT ============
// ===========================================
export const devCreatePayment: RequestHandler = async (req, res) => {
  const { idOrNumber } = req.params as { idOrNumber: string };

  try {
    const out = await prisma.$transaction(async (tx) => {
      const order = isUuidLike(idOrNumber)
        ? await tx.orders.findUnique({ where: { id: idOrNumber } })
        : await tx.orders.findFirst({ where: { order_number: idOrNumber } });

      if (!order) throw new Error("ORDER_NOT_FOUND");
      if (order.status === "paid") {
        return {
          orderId: order.id,
          orderNumber: order.order_number,
          status: "paid",
          amount: order.amount ? Number(order.amount) : undefined,
          currency: order.currency ?? "RUB",
        };
      }
      if (!isPayableStatus(order.status))
        throw new Error("ORDER_STATUS_NOT_PAYABLE");

      // 1) Бронируем ключи под заказ (идемпотентно добирая недостающее)
      await ensureReservations(tx, order.id);

      // 2) Считаем сумму и фиксируем снапшот (+ ставим awaiting_payment + provider_order_id)
      return await computeAndSnapshotAmount(tx, order.id);
    });

    res.json(out);
  } catch (e: any) {
    const map: Record<string, string> = {
      ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
      ORDER_STATUS_NOT_PAYABLE: "ORDER_STATUS_NOT_PAYABLE",
      USER_LIMIT_REACHED: "USER_LIMIT_REACHED",
      NO_STOCK: "NO_STOCK",
    };
    res
      .status(400)
      .json({ message: map[e?.message] ?? "CREATE_PAYMENT_ERROR" });
  }
};

// ===========================================
// ================ DEV: PAY =================
// ===========================================
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
          amount: order.amount ? Number(order.amount) : undefined,
          currency: order.currency ?? "RUB",
        };
      }

      if (!isPayableStatus(order.status))
        throw new Error("ORDER_STATUS_NOT_PAYABLE");

      // Гарантируем брони и снапшот суммы, даже если напрямую дернули pay
      await ensureReservations(tx, order.id);
      if (
        !order.amount ||
        !order.provider_order_id ||
        order.status === "pending"
      ) {
        await computeAndSnapshotAmount(tx, order.id);
      }

      const created: Array<{
        code: string;
        productId: string;
        orderItemId: string;
      }> = [];

      for (const it of order.items) {
        if (it.item_type === "product" && it.product_id) {
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
            await tx.product_keys.update({
              where: { id: pk.id },
              data: {
                used: true,
                reserved_by_order_id: null,
                reserved_until: null,
              },
            });

            await logKeyEvents(tx, [
              {
                event: "paid",
                product_key_id: pk.id,
                order_id: order.id,
                order_item_id: it.id,
              },
            ]);

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

      const paidOrder = await tx.orders.update({
        where: { id: order.id },
        data: { status: "paid", updated_at: new Date() },
        select: { id: true, order_number: true, amount: true, currency: true },
      });

      return {
        orderId: paidOrder.id,
        orderNumber: paidOrder.order_number,
        status: "paid",
        aliases: created,
        amount: paidOrder.amount ? Number(paidOrder.amount) : undefined,
        currency: paidOrder.currency ?? "RUB",
      };
    });

    res.json(result);
  } catch (e: any) {
    console.error(e);
    const map: Record<string, string> = {
      ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
      ORDER_STATUS_NOT_PAYABLE: "ORDER_STATUS_NOT_PAYABLE",
      USER_LIMIT_REACHED: "USER_LIMIT_REACHED",
      NO_STOCK: "NO_STOCK",
      RESERVE_MISMATCH: "RESERVE_MISMATCH",
      SUB_NOT_FOUND: "SUB_NOT_FOUND",
    };
    res.status(400).json({ message: map[e?.message] ?? "PAY_ERROR" });
  }
};
