import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { encrypt } from "../utils/crypto";
import { safeDecrypt } from "../utils/safeDecrypt";
import { hashPassword } from "../utils/hash";

// Список
export async function listStaffMembers(req: Request, res: Response) {
  const rows = await prisma.staff_members.findMany({
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
  res.json(rows.map((r) => ({ ...r, email: safeDecrypt(r.email) })));
}

// Один
export async function getStaffMemberById(req: Request, res: Response) {
  const { id } = req.params;
  const r = await prisma.staff_members.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
  if (!r) return res.status(404).json({ message: "Не найден" });
  res.json({ ...r, email: safeDecrypt(r.email) });
}

// Создать
export async function createStaffMember(req: Request, res: Response) {
  const { username, email, role, password } = req.body as {
    username: string;
    email: string;
    role: "administrator" | "operator";
    password: string;
  };

  if (!username || !email || !role || !password) {
    return res
      .status(400)
      .json({ message: "username, email, role, password — обязательны" });
  }

  const exists = await prisma.staff_members.findFirst({
    where: { OR: [{ username }, { email: encrypt(email) }] },
  });
  if (exists)
    return res
      .status(409)
      .json({ message: "Такой username или email уже есть" });

  const hashed = await hashPassword(password);

  const row = await prisma.staff_members.create({
    data: { username, email: encrypt(email), role, password: hashed },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });

  res.status(201).json({ ...row, email: safeDecrypt(row.email) });
}

// Обновить (пароль опционально)
export async function updateStaffMember(req: Request, res: Response) {
  const { id } = req.params;
  const { username, email, role, password } = req.body as {
    username?: string;
    email?: string;
    role?: "administrator" | "operator";
    password?: string;
  };

  const data: any = {};
  if (username !== undefined) data.username = username;
  if (email !== undefined) data.email = encrypt(email);
  if (role !== undefined) data.role = role;
  if (password) data.password = await hashPassword(password);

  const row = await prisma.staff_members.update({
    where: { id },
    data,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });

  res.json({ ...row, email: safeDecrypt(row.email) });
}

// Удалить
export async function deleteStaffMember(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.staff_members.delete({ where: { id } });
  res.json({ ok: true });
}
