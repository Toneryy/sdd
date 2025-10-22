// src/routes/auth.routes.ts
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authLimiter } from "../middlewares/rateLimit";
import { validateBody } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators/auth.validators";

const router = Router();

// Регистрация с валидацией и rate limiting
router.post(
  "/register",
  authLimiter,
  validateBody(registerSchema),
  register
);

// Логин с валидацией и строгим rate limiting
router.post(
  "/login",
  authLimiter,
  validateBody(loginSchema),
  login
);

export default router;
