// /src/routes/categories.routes.ts
import { Router } from "express";
import {
  listCategories,
  addCategory,
  updateCategory, // Добавлен новый маршрут для обновления
  deleteCategory, // Добавлен новый маршрут для удаления
} from "../controllers/categories.controller";

const router = Router();

// Получить все категории
router.get("/", listCategories);

// Добавить новую категорию
router.post("/", addCategory);

// Обновить категорию по id
router.put("/:id", updateCategory); // Маршрут для обновления

// Удалить категорию по id
router.delete("/:id", deleteCategory); // Маршрут для удаления

export default router;
