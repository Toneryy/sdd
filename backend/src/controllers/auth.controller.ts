// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import { prisma } from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/hash' 
import { sign, Secret, SignOptions } from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, phone, password } = req.body;

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: "Пользователь уже существует" });
    return;
  }

  const hashed = await hashPassword(password);
  await prisma.users.create({
    data: { username, email, phone, password: hashed },
  });

  res.status(201).json({ message: "Регистрация прошла успешно" });
};
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

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

  // Приводим опции к any, чтобы TS не ругался на expiresIn
  const options: any = { expiresIn: JWT_EXPIRES_IN };

  const token = sign({ userId: user.id }, JWT_SECRET as Secret, options);

  res.json({
    token,
    user: { id: user.id, email: user.email, username: user.username },
  });
};