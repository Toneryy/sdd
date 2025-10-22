import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { register, login, me, logout } from "../controllers/auth.controller";
import { authLimiter } from "../middleware/rateLimit";
import { validateBody } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/auth.validators";

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

// Получение текущего пользователя
router.get("/me", authenticateJWT, me);

// Выход
router.post("/logout", logout);

export default router;
