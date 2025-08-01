// backend/src/controllers/profile.controller.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/prisma";
import { withDecryptedUser } from "../utils/withDecryptedUser"; // ← добавили

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

    const user = withDecryptedUser(rawUser); // ← теперь человекочитаемо

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
