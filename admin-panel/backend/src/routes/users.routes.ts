import { Router } from "express";
import {
  listUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

const router = Router();

// Получить всех пользователей
router.get("/", listUsers);

// Добавить нового пользователя
router.post("/", addUser);

// Обновить пользователя
router.put("/:id", updateUser);

// Удалить пользователя
router.delete("/:id", deleteUser);

export default router;
