// backend/src/controllers/users.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

/* ------------------------------------------------------------------ */
/*  GET /api/admin/users  ─ список пользователей с датой конца подписки  */
/* ------------------------------------------------------------------ */
export const listUsers = async (_: Request, res: Response) => {
  try {
    const latestSubs = await prisma.user_subscriptions.findMany({
      orderBy: { end_date: "desc" },
      distinct: ["user_id"],
      select: { user_id: true, end_date: true },
    });

    const lastEndMap = new Map<string, Date>(
      latestSubs.map((s) => [s.user_id, s.end_date])
    );

    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
      },
    });

    const result = users.map((u) => ({
      ...u,
      lastEndDate: lastEndMap.get(u.id) ?? null,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Не удалось получить пользователей" });
  }
};

/* ------------------------------------------------------------------ */
/*  GET /api/admin/users/:id  ─ профиль + подписки + продукты + обращения  */
/* ------------------------------------------------------------------ */
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
      },
    });

    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });

    /* подписки */
    const subscriptions = await prisma.user_subscriptions.findMany({
      where: { user_id: id },
      include: { subscriptions: true },
      orderBy: { start_date: "desc" },
    });

    /* приобретённые продукты */
    const products = await prisma.user_products.findMany({
      where: { user_id: id },
      include: { products: true }, // подтягиваем инфо о товаре
      orderBy: { added_at: "desc" },
    });

    /* сервисные обращения */
    const supportRequests = await prisma.support_requests.findMany({
      where: { user_id: id },
      include: {
        operator: { select: { id: true, username: true, email: true } },
      },
      orderBy: { created_at: "desc" },
    });

    res.json({ user, subscriptions, products, supportRequests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении пользователя" });
  }
};

/* ------------------------------------------------------------------ */
/*  POST /api/admin/users  ─ создать пользователя                       */
/* ------------------------------------------------------------------ */
export const addUser = async (req: Request, res: Response) => {
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

/* ------------------------------------------------------------------ */
/*  PUT /api/admin/users/:id  ─ обновить пользователя                   */
/* ------------------------------------------------------------------ */
export const updateUser = async (req: Request, res: Response) => {
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

/* ------------------------------------------------------------------ */
/*  DELETE /api/admin/users/:id  ─ удалить пользователя                 */
/* ------------------------------------------------------------------ */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.users.delete({ where: { id } });
    res.json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении пользователя" });
  }
};
