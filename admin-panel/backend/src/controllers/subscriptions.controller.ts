import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Получение всех подписок
export const listSubscriptions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subscriptions = await prisma.subscriptions.findMany();
    res.json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении подписок" });
  }
};

// Добавление новой подписки
export const addSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, duration_days, price, description } = req.body;
  try {
    const newSubscription = await prisma.subscriptions.create({
      data: { title, duration_days, price, description },
    });
    res.status(201).json(newSubscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении подписки" });
  }
};
