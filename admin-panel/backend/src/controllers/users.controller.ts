// backend/src/controllers/users.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import {
  withDecryptedUser,
  RawUser, // тип описан в utils/withDecryptedUser.ts
} from "../utils/withDecryptedUser";
import { withEncryptedUser } from "../utils/withEncryptedUser";

/* -------------------------------------------------------------- */
/*  GET /api/admin/users  ─ список + дата последней подписки      */
/* -------------------------------------------------------------- */
export const listUsers = async (_: Request, res: Response) => {
  try {
    /* берём даты окончания активных подписок */
    const latestSubs = await prisma.user_subscriptions.findMany({
      orderBy: { end_date: "desc" },
      distinct: ["user_id"],
      select: { user_id: true, end_date: true },
    });
    const lastEndMap = new Map<string, Date>(
      latestSubs.map((s) => [s.user_id, s.end_date])
    );

    const raw = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        created_at: true,
      },
    });

    const users = raw.map((u) => ({
      ...withDecryptedUser(u as RawUser),
      lastEndDate: lastEndMap.get(u.id) ?? null,
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
        password,
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
      data: { ...enc, password },
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
    // берём первые 1000 юзеров, расшифровываем, фильтруем
    const raw = await prisma.users.findMany({
      take: 1000,
      orderBy: { created_at: "desc" },
      select: { id: true, username: true, email: true, phone: true },
    });
    const users = raw
      .map((u) => withDecryptedUser(u as RawUser))
      .filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone ?? "").replace(/\D/g, "").includes(q.replace(/\D/g, ""))
      )
      .slice(0, 15); // отдаём максимум 15

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка поиска пользователей" });
  }
};
