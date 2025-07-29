import { Router } from "express";
import {
  listUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  searchUsers,
} from "../controllers/users.controller";

const router = Router();

router.get('/search', searchUsers);

// Получить всех пользователей
router.get("/", listUsers);

router.get("/:id", getUserById);

// Добавить нового пользователя
router.post("/", addUser);

// Обновить пользователя
router.put("/:id", updateUser);

// Удалить пользователя
router.delete("/:id", deleteUser);

export default router;
