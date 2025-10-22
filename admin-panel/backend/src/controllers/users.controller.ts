// backend/src/controllers/users.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import {
  withDecryptedUser,
  RawUser, // тип описан в utils/withDecryptedUser.ts
} from "../utils/withDecryptedUser";
import { hashPassword } from "../utils/hash";
import { withEncryptedUser } from "../utils/withEncryptedUser";

/* -------------------------------------------------------------- */
/*  GET /api/admin/users  ─ список + дата последней подписки      */
/* -------------------------------------------------------------- */
export const listUsers = async (_: Request, res: Response) => {
  try {
    // Один запрос с LEFT JOIN и подзапросом для последней подписки
    const raw = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
        user_subscriptions: {
          orderBy: { end_date: "desc" },
          take: 1,
          select: { end_date: true },
        },
      },
    });

    const users = raw.map((u) => ({
      ...withDecryptedUser(u as RawUser),
      lastEndDate: u.user_subscriptions[0]?.end_date ?? null,
    }));

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Не удалось получить пользователей" });
  }
};

/* -------------------------------------------------------------- */
/*  GET /api/admin/users/:id  ─ профиль + связки                  */
/* -------------------------------------------------------------- */
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const rawUser = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
      },
    });
    if (!rawUser)
      return res.status(404).json({ message: "Пользователь не найден" });

    const user = withDecryptedUser(rawUser as RawUser);

    const subscriptions = await prisma.user_subscriptions.findMany({
      where: { user_id: id },
      include: { subscriptions: true },
      orderBy: { start_date: "desc" },
    });

    const products = await prisma.user_products.findMany({
      where: { user_id: id },
      include: { products: true },
      orderBy: { added_at: "desc" },
    });

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

/* -------------------------------------------------------------- */
/*  POST /api/admin/users  ─ создать пользователя                 */
/* -------------------------------------------------------------- */
export const addUser = async (req: Request, res: Response) => {
  const { username, email, phone, password } = req.body;

  // шифруем
  const enc = withEncryptedUser({ username, email, phone });

  try {
    const created = await prisma.users.create({
      data: {
        // non-null assertions (!) – говорим TS «тут точно строка»
        username: enc.username!, // ← !
        email: enc.email!, // ← !
        phone: enc.phone ?? null, // phone опционален
        password: await hashPassword(password),
      },
    });

    res.status(201).json(withDecryptedUser(created as RawUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении пользователя" });
  }
};

/* -------------------------------------------------------------- */
/*  PUT /api/admin/users/:id  ─ обновить пользователя             */
/* -------------------------------------------------------------- */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, phone, password } = req.body;
  const enc = withEncryptedUser({ username, email, phone });

  try {
    const updated = await prisma.users.update({
      where: { id },
      data: {
        ...enc,
        ...(password ? { password: await hashPassword(password) } : {}),
      },
    });
    res.json(withDecryptedUser(updated as RawUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении пользователя" });
  }
};

/* -------------------------------------------------------------- */
/*  DELETE /api/admin/users/:id                                   */
/* -------------------------------------------------------------- */
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

/* -------------------------------------------------------------- */
/*  GET /api/admin/users/search?q=…                               */
/*  ILIKE по шифрованным данным невозможен →                      */
/*  делаем «в памяти» фильтрацию до 1 000 пользователей            */
/* -------------------------------------------------------------- */
export const searchUsers = async (req: Request, res: Response) => {
  const q = (req.query.q as string | undefined)?.trim()?.toLowerCase() ?? "";
  if (!q) return res.json([]);

  try {
    const raw = await prisma.users.findMany({
      take: 1000,
      orderBy: { created_at: "desc" },
      select: { id: true, username: true, email: true, phone: true },
    });

    // нормализуем телефонную часть запроса
    const phoneQuery = q.replace(/\D/g, "");

    const users = raw
      .map((u) => withDecryptedUser(u as RawUser))
      .filter((u) => {
        const nameMatch = u.username.toLowerCase().includes(q);
        const emailMatch = u.email.toLowerCase().includes(q);

        let phoneMatch = false;
        if (phoneQuery.length > 0 && u.phone) {
          const digits = u.phone.replace(/\D/g, "");
          phoneMatch = digits.includes(phoneQuery);
        }

        return nameMatch || emailMatch || phoneMatch;
      })
      .slice(0, 15);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка поиска пользователей" });
  }
};

/* -------------------------------------------------------------- */
/*  GET /api/admin/clients  ─ только клиенты с подписками        */
/* -------------------------------------------------------------- */
export const listClients = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "50", search = "" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Запрос только пользователей с подписками
    const raw = await prisma.users.findMany({
      where: {
        user_subscriptions: {
          some: {}, // есть хотя бы одна подписка
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
        user_subscriptions: {
          orderBy: { end_date: "desc" },
          take: 1,
          select: { end_date: true },
        },
      },
      skip,
      take: limitNum,
    });

    const clients = raw.map((u) => ({
      ...withDecryptedUser(u as RawUser),
      lastEndDate: u.user_subscriptions[0]?.end_date ?? null,
    }));

    // Фильтрация по поиску в памяти (т.к. данные зашифрованы)
    const filtered = search
      ? clients.filter((c) => {
          const q = (search as string).toLowerCase();
          return (
            c.username.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.phone?.toLowerCase().includes(q)
          );
        })
      : clients;

    // Подсчёт общего количества клиентов
    const total = await prisma.users.count({
      where: {
        user_subscriptions: {
          some: {},
        },
      },
    });

    res.json({
      data: filtered,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Не удалось получить клиентов" });
  }
};
