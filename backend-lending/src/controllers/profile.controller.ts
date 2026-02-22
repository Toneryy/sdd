// backend/src/controllers/profile.controller.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/prisma";
import { withDecryptedUser } from "../utils/withDecryptedUser";

// уже был
export const getProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId!;
  try {
    const rawUser = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
      },
    });
    if (!rawUser) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }
    const user = withDecryptedUser(rawUser);

    const activeSubscription = await prisma.user_subscriptions.findFirst({
      where: { user_id: userId, active: true },
      orderBy: { end_date: "desc" },
      include: { subscriptions: true },
    });

    const supportHistory = await prisma.support_requests.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      take: 10,
    });

    // это прежний источник — оставляем для совместимости
    const boughtProducts = await prisma.user_products.findMany({
      where: { user_id: userId },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            img: true,
          },
        },
      },
    });

    res.json({ user, activeSubscription, supportHistory, boughtProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// НОВОЕ: постраничная выдача покупок из paid-заказов
export const getPurchases = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId!;
  // page — с 1; pageSize — по умолчанию 12 заказов за раз
  const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10) || 1);
  const pageSize = Math.min(
    50,
    Math.max(1, parseInt(String(req.query.pageSize ?? "12"), 10) || 12)
  );
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  try {
    const [totalOrders, orders] = await Promise.all([
      prisma.orders.count({
        where: { user_id: userId, status: "paid" },
      }),
      prisma.orders.findMany({
        where: { user_id: userId, status: "paid" },
        orderBy: { created_at: "desc" },
        skip,
        take,
        include: {
          items: {
            where: { item_type: "product", product_id: { not: null } },
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  img: true,
                },
              },
              units: {
                include: {
                  key_alias: { select: { activated: true } },
                },
              },
            },
          },
        },
      }),
    ]);

    // Разворачиваем в карточки по item (не по unit, чтобы не плодить на qty)
    const cards = orders.flatMap((o) =>
      o.items.map((it) => {
        const activatedCount = it.units.filter(
          (u) => u.key_alias?.activated
        ).length;
        return {
          orderId: o.id,
          orderNumber: o.order_number,
          purchasedAt: o.created_at,
          productId: it.product?.id,
          name: it.product?.name,
          img: it.product?.img,
          description: it.product?.description,
          price: it.product?.price,
          qty: it.qty,
          activatedCount,
        };
      })
    );

    res.json({
      page,
      pageSize,
      totalOrders, // всего заказов (страницы идут по заказам)
      ordersCount: orders.length,
      items: cards, // карточки товаров из этой страницы заказов
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
