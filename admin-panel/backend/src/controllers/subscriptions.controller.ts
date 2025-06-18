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

// Обновление подписки
export const updateSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, duration_days, price, description, image } = req.body;

  try {
    const updatedSubscription = await prisma.subscriptions.update({
      where: { id },
      data: { title, duration_days, price, description, image }, // добавляем image
    });
    res.json(updatedSubscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении подписки" });
  }
};

// Удаление подписки
export const deleteSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await prisma.subscriptions.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении подписки" });
  }
};
