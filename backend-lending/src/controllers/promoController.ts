import { Response, RequestHandler  } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/prisma";

export const getUsedPromos: RequestHandler = async (req, res) => {
  const userId = (req as AuthRequest).userId;
  const usages = await prisma.promo_usage.findMany({
    where: { user_id: userId },
    include: { promocodes: true },
  });

  const promos = usages.map((u) => ({
    code: u.promocodes.code,
    type: u.promocodes.type,
    denomination: u.promocodes.denomination,
    usedAt: u.used_at,
  }));

  res.json(promos);
};

export const removeUsedPromo: RequestHandler = async (req, res) => {
  const userId = (req as AuthRequest).userId;
  const { code } = req.params;

  const promo = await prisma.promocodes.findUnique({ where: { code } });
  if (!promo) {
    res.status(404).json({ message: "Не найдено" });
    return;
  }

  await prisma.promo_usage.deleteMany({
    where: { user_id: userId, promocode_id: promo.id },
  });

  res.json({ message: "Удалено" });
};

export const applyPromoCode = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const { code } = req.body;

  console.log("UserId in req:", userId);
  console.log("Code from body:", code);

  if (!userId || !code) {
    res
      .status(400)
      .json({ message: "Недостаточно данных: userId или code отсутствуют" });
    return;
  }

  try {
    const promo = await prisma.promocodes.findUnique({
      where: { code },
    });

    if (!promo) {
      res.status(404).json({ message: "Промокод не найден" });
      return;
    }

    if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
      res.status(400).json({ message: "Срок действия промокода истёк" });
      return;
    }

    // Проверка, использовал ли пользователь этот промокод
    const alreadyUsed = await prisma.promo_usage.findFirst({
      where: {
        user_id: userId,
        promocode_id: promo.id,
      },
    });

    if (alreadyUsed) {
      res.status(400).json({ message: "Вы уже использовали этот промокод" });
      return;
    }

    // Проверка, использовал ли пользователь промокод того же типа
    // Здесь важно, чтобы условие проверяло по точному совпадению типа.
    // Добавим лог для диагностики:
    console.log("Проверяем промокоды типа:", promo.type);

    const sameTypeUsed = await prisma.promo_usage.findFirst({
      where: {
        user_id: userId,
        promocodes: {
          type: promo.type, // здесь promo.type должен строго совпадать с записью в БД
        },
      },
      include: {
        promocodes: true,
      },
    });

    if (sameTypeUsed) {
      res
        .status(400)
        .json({ message: `Вы уже использовали промокод типа "${promo.type}"` });
      return;
    }

    // Если все проверки прошли — создаём запись об использовании промокода
    await prisma.promo_usage.create({
      data: {
        user_id: userId,
        promocode_id: promo.id,
      },
    });

    res.json({
      message: "Промокод применён успешно",
      type: promo.type,
      denomination: promo.denomination,
    });
  } catch (error) {
    console.error("Ошибка при применении промокода:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
