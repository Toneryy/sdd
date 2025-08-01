import { RequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { encrypt as enc, decrypt as dec } from "../crypto/crypto";
import { sign, Secret } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

/* -------------------------  POST /auth/register  ------------------------- */
export const register: RequestHandler = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    await prisma.users.create({
      data: {
        username: enc(username),
        email: enc(email),
        phone: phone ? enc(phone) : null,
        password: await hashPassword(password),
      },
    });

    res.status(201).json({ message: "Регистрация прошла успешно" });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const field = (err.meta?.target as string[])[0];
      const map: Record<string, string> = {
        username: "Имя уже занято",
        email: "Email уже зарегистрирован",
        phone: "Телефон уже используется",
      };
      res.status(400).json({ message: map[field] ?? "Дублирование данных" });
    } else {
      console.error(err);
      res.status(500).json({ message: "Ошибка при регистрации" });
    }
  }
};

/* ---------------------------  POST /auth/login  -------------------------- */
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({ where: { email: enc(email) } });
  if (!user || !(await comparePassword(password, user.password))) {
    res.status(401).json({ message: "Неверный логин или пароль" });
    return;
  }

  const token = sign(
    { userId: user.id },
    JWT_SECRET as Secret,
    { expiresIn: JWT_EXPIRES_IN } as any
  );

  res.json({
    token,
    user: {
      id: user.id,
      username: dec(user.username),
      email: dec(user.email),
      phone: user.phone ? dec(user.phone) : null,
    },
  });
};
