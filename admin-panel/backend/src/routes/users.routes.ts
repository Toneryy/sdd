import { Router } from "express";
import {
  listUsers,
  listClients,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  searchUsers,
} from "../controllers/users.controller";
import { createUserLimiter } from "../middleware/rateLimit";
import { validateBody, validateParams, validateQuery } from "../middleware/validate";
import { 
  createUserSchema, 
  updateUserSchema, 
  idParamSchema,
  clientsQuerySchema 
} from "../validators/users.validators";

const router = Router();

// Поиск пользователей
router.get('/search', searchUsers);

// Получить только клиентов (с подписками) с валидацией query
router.get(
  "/clients", 
  validateQuery(clientsQuerySchema),
  listClients
);

// Получить всех пользователей
router.get("/", listUsers);

// Получить пользователя по ID с валидацией
router.get(
  "/:id", 
  validateParams(idParamSchema),
  getUserById
);

// Добавить нового пользователя с валидацией и rate limiting
router.post(
  "/", 
  createUserLimiter,
  validateBody(createUserSchema),
  addUser
);

// Обновить пользователя с валидацией
router.put(
  "/:id", 
  validateParams(idParamSchema),
  validateBody(updateUserSchema),
  updateUser
);

// Удалить пользователя с валидацией
router.delete(
  "/:id", 
  validateParams(idParamSchema),
  deleteUser
);

export default router;
