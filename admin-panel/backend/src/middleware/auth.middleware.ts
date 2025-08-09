import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type JwtUser = { sub: string; role: "administrator" | "operator" };

declare module "express-serve-static-core" {
  interface Request {
    user?: { sub: string; role: string };
  }
}

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is missing");
    return res.sendStatus(500);
  }

  const token =
    req.cookies?.jwt || req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, secret) as { sub: string; role: string };
    req.user = payload;
    next();
  } catch {
    return res.sendStatus(401);
  }
}
