// src/middlewares/rateLimit.ts
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import type { Request } from "express";

/** Берём userId из тела/авторизации, иначе безопасный нормализованный IP */
function keyByUserOrIp(req: Request) {
  const userId =
    (req.body && (req.body.userId as string)) ||
    ((req as any).user?.id as string | undefined);

  if (userId && userId.trim()) return `u:${userId}`;

  // --- нормализуем IP, гарантируем string ---
  const rawIp =
    (typeof req.ip === "string" && req.ip) ||
    (req.headers["x-forwarded-for"] as string | undefined)
      ?.split(",")[0]
      ?.trim() ||
    req.socket?.remoteAddress ||
    "::1"; // запасной вариант

  const normalized = ipKeyGenerator(rawIp); // ВАЖНО: передаём СТРОКУ
  return `ip:${normalized}`;
}

// Мягкий лимит на общие запросы
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: keyByUserOrIp,
});

// Строгий лимит на checkout
export const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: keyByUserOrIp,
  message: { message: "RATE_LIMIT_CHECKOUT" },
});

// Строгий лимит на оплату
export const payLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: keyByUserOrIp,
  message: { message: "RATE_LIMIT_PAY" },
});

// Строгий лимит на активацию
export const activateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: keyByUserOrIp,
  message: { message: "RATE_LIMIT_ACTIVATE" },
});
