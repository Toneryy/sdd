// src/controllers/orders.controller.ts
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma";

function isUuidLike(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    s
  );
}

/**
 * GET /api/purchase/order/:idOrNumber
 * Поддерживает UUID и 7-значный orderNumber (строка).
 * Возвращает статус, позиции, алиасы (если есть).
 */
export const getOrderStatus: RequestHandler = async (req, res) => {
  const { idOrNumber } = req.params as { idOrNumber: string };

  try {
    const order = isUuidLike(idOrNumber)
      ? await prisma.orders.findUnique({
          where: { id: idOrNumber },
          include: {
            items: {
              include: {
                units: { include: { key_alias: { select: { code: true } } } },
              },
            },
          },
        })
      : await prisma.orders.findFirst({
          where: { order_number: idOrNumber },
          include: {
            items: {
              include: {
                units: { include: { key_alias: { select: { code: true } } } },
              },
            },
          },
        });

    if (!order) {
      res.status(404).json({ message: "ORDER_NOT_FOUND" });
      return;
    }

    const items = order.items.map((it) => ({
      id: it.id,
      type: it.item_type,
      productId: it.product_id,
      subscriptionId: it.subscription_id,
      qty: it.qty,
      aliases:
        it.units
          ?.map((u) => u.key_alias?.code)
          .filter(Boolean)
          .map(String) ?? [],
    }));

    res.json({
      orderId: order.id,
      orderNumber: order.order_number,
      status: order.status,
      items,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "ORDER_STATUS_ERROR" });
  }
};

/**
 * GET /api/purchase/my?userId=...
 * Возвращает:
 * - products: список user_products + признак активирован/нет
 * - subscriptions: активные/неактивные подписки и даты
 */
export const getMyAssets: RequestHandler = async (req, res) => {
  const userId = (req.query.userId as string) || (req.body?.userId as string);
  if (!userId) {
    res.status(400).json({ message: "userId required" });
    return;
  }

  try {
    const [products, subs] = await Promise.all([
      prisma.user_products.findMany({
        where: { user_id: userId },
        orderBy: { added_at: "desc" },
        include: {
          products: { select: { name: true, img: true, description: true } },
          product_key: {
            select: {
              id: true,
              // через алиасы можно понять, активирован ли ключ
              keys_aliases: {
                select: { activated: true, activated_at: true, code: true },
              },
            },
          },
        },
      }),
      prisma.user_subscriptions.findMany({
        where: { user_id: userId },
        orderBy: { start_date: "desc" },
        include: {
          subscriptions: {
            select: { title: true, duration_days: true, image: true },
          },
        },
      }),
    ]);

    const productsOut = products.map((p) => ({
      userProductId: p.id,
      productId: p.product_id,
      name: p.products?.name ?? null,
      img: p.products?.img ?? null,
      description: p.products?.description ?? null,
      addedAt: p.added_at,
      activated:
        p.product_key?.keys_aliases?.some((a) => a.activated === true) ?? false,
      activatedAt:
        p.product_key?.keys_aliases?.find((a) => a.activated)?.activated_at ??
        null,
      aliasCode:
        p.product_key?.keys_aliases?.find((a) => a.activated)?.code ?? null,
    }));

    const subsOut = subs.map((s) => ({
      userSubscriptionId: s.id,
      subscriptionId: s.subscription_id,
      title: s.subscriptions?.title ?? null,
      durationDays: s.subscriptions?.duration_days ?? null,
      image: s.subscriptions?.image ?? null,
      startDate: s.start_date,
      endDate: s.end_date,
      active: s.active,
    }));

    res.json({ products: productsOut, subscriptions: subsOut });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "MY_ASSETS_ERROR" });
  }
};
