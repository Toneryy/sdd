import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { sign, Secret } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, email, phone, password } = req.body;
  const hashed = await hashPassword(password);

  try {
    await prisma.users.create({
      data: { username, email, phone, password: hashed },
    });
    res.status(201).json({ message: "Регистрация прошла успешно" });
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const target = err.meta?.target;
      const field = Array.isArray(target) ? target[0] : "";
      let msg = "Пользователь уже существует";
      if (field === "username") msg = "Имя уже занято";
      if (field === "email") msg = "Email уже зарегистрирован";
      if (field === "phone") msg = "Телефон уже используется";
      res.status(400).json({ message: msg });
    } else {
      console.error(err);
      res.status(500).json({ message: "Ошибка при регистрации" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "Неверный логин или пароль" });
      return;
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Неверный логин или пароль" });
      return;
    }

    // Вот так, без проблем с типами:
    const token = sign(
      { userId: user.id },
      JWT_SECRET as Secret,
      { expiresIn: JWT_EXPIRES_IN } as any
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при входе" });
  }
};
