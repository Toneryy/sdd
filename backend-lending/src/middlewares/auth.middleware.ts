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
  // Проверка наличия JWT_SECRET
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    res.status(500).json({ message: 'Server configuration error' });
    return;
  }

  const authHeader = req.headers.authorization;
  
  // Проверка формата заголовка
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: "Нет токена или неверный формат" });
    return;
  }

  // Извлекаем токен после 'Bearer '
  const token = authHeader.substring(7);
  
  if (!token) {
    res.status(401).json({ message: "Токен отсутствует" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };
    
    if (!payload.userId) {
      res.status(401).json({ message: "Неверный формат токена" });
      return;
    }
    
    req.userId = payload.userId;
    next();
  } catch (err) {
    // Разные типы ошибок JWT
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Токен истёк" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Неверный токен" });
    } else if (err instanceof jwt.NotBeforeError) {
      res.status(401).json({ message: "Токен ещё не активен" });
    } else {
      console.error('JWT verification error:', err);
      res.status(401).json({ message: "Ошибка авторизации" });
    }
  }
};
