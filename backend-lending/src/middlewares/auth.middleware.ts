// backend/src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Нет токена" });
    return;
  }

  const [, token] = authHeader.split(" ");
  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as {
      userId: string;
    };
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: "Неверный токен" });
    return;
  }
};
