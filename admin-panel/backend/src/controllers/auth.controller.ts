import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import ms, { type StringValue } from "ms";
import { prisma } from "../config/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import { encrypt } from "../utils/crypto";
import { safeDecrypt } from "../utils/safeDecrypt";

interface AuthenticatedRequest extends Request {
  user?: { sub: string; role: string };
}

const JWT_SECRET = process.env.JWT_SECRET!;

// ЯВНО говорим TS, что это StringValue (формат ms: "14d", "1h" и т.п.)
const JWT_EXPIRES_IN: StringValue = (process.env.JWT_EXPIRES_IN || "14d") as StringValue;

// Опции подписи токена
const SIGN_OPTS: SignOptions = {
  expiresIn: JWT_EXPIRES_IN,
};

// maxAge для cookie в миллисекундах
const COOKIE_MAX_AGE = ms(JWT_EXPIRES_IN) ?? ms("14d" as StringValue)!;

function issueCookie(res: Response, token: string) {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}


/**
 * POST /api/auth/register
 * Регистрация сотрудника.
 * Разрешаем:
 *  - если staff_members ещё пустая (bootstrap первого пользователя)
 *  - либо (на будущее) если запрос аутентифицирован — сейчас не требуем
 */
export async function register(req: Request, res: Response) {
  const { username, email, role, password } = req.body as {
    username: string;
    email: string;
    role: "administrator" | "operator";
    password: string;
  };

  if (!username || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "username, email, role, password — обязательны" });
  }
  if (!["administrator", "operator"].includes(role)) {
    return res.status(400).json({ message: "Некорректная роль" });
  }

  const count = await prisma.staff_members.count();
  const isBootstrap = count === 0;

  // Проверка уникальности (username — обычный текст, email — шифруем)
  const exists = await prisma.staff_members.findFirst({
    where: {
      OR: [{ username }, { email: encrypt(email) }],
    },
  });
  if (exists) {
    return res
      .status(409)
      .json({ message: "Такой username или email уже есть" });
  }

  const hashed = await hashPassword(password);

  const row = await prisma.staff_members.create({
    data: {
      username, // username не шифруем
      email: encrypt(email), // email шифруем
      password: hashed,
      role,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });

  const user = { ...row, email: safeDecrypt(row.email) };

  // Если это первый сотрудник — удобно сразу залогинить
  if (isBootstrap) {
    const token = jwt.sign(
      { sub: row.id, role: row.role },
      JWT_SECRET,
      SIGN_OPTS
    );
    issueCookie(res, token);
  }

  res.status(201).json(user);
}

/**
 * POST /api/auth/login
 */
export async function login(req: Request, res: Response) {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  if (!username || !password) {
    return res.status(400).json({ message: "username и password обязательны" });
  }

  const user = await prisma.staff_members.findFirst({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  const ok = await comparePassword(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    JWT_SECRET,
    SIGN_OPTS
  );
  issueCookie(res, token);

  res.json({
    id: user.id,
    username: user.username,
    email: safeDecrypt(user.email),
    role: user.role,
  });
}

/**
 * GET /api/auth/me
 */
export async function me(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.sub;
  if (!userId) return res.sendStatus(401);

  const row = await prisma.staff_members.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
  if (!row) return res.sendStatus(404);

  res.json({ ...row, email: safeDecrypt(row.email) });
}

/**
 * POST /api/auth/logout
 */
export async function logout(req: Request, res: Response) {
  res.clearCookie("jwt", { path: "/" }).json({ message: "ok" });
}
