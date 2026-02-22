// backend/src/controllers/subscriptions.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// GET /api/subscriptions
export const listSubscriptions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subs = await prisma.subscriptions.findMany();
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении подписок" });
  }
};

// GET /api/subscriptions/:id
export const getSubscriptionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const sub = await prisma.subscriptions.findUnique({ where: { id } });
    if (!sub) {
      res.status(404).json({ message: "Подписка не найдена" });
      return;
    }
    res.json(sub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении подписки" });
  }
};
