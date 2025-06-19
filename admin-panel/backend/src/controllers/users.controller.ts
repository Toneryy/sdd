// backend/src/controllers/users.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

/**
 * GET /api/admin/users
 * Возвращает пользователей с полем lastEndDate (ISO-строка или null)
 */
export const listUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    // 1) Получаем по одной (самой свежей) подписке для каждого user_id
    const latestSubs = await prisma.user_subscriptions.findMany({
      orderBy: { end_date: "desc" },
      distinct: ["user_id"], // берем только по одному на каждый user_id
      select: {
        user_id: true,
        end_date: true,
      },
    });

    // Мапа user_id → end_date
    const lastEndMap = new Map<string, Date>(
      latestSubs.map((s) => [s.user_id, s.end_date])
    );

    // 2) Запрашиваем всех пользователей
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
      },
    });

    // 3) Собираем плоский массив с lastEndDate
    const result = users.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      phone: u.phone,
      created_at: u.created_at,
      lastEndDate: lastEndMap.get(u.id) ?? null,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Не удалось получить пользователей" });
  }
};

/**
 * POST /api/admin/users
 */
export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, phone, password } = req.body;
  try {
    const newUser = await prisma.users.create({
      data: { username, email, phone, password },
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении пользователя" });
  }
};

/**
 * PUT /api/admin/users/:id
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { username, email, phone, password } = req.body;
  try {
    const updated = await prisma.users.update({
      where: { id },
      data: { username, email, phone, password },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении пользователя" });
  }
};

/**
 * DELETE /api/admin/users/:id
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.users.delete({ where: { id } });
    res.json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении пользователя" });
  }
};
