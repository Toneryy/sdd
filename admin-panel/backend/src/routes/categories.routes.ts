// backend/src/routes/categories.routes.ts
import { Router } from "express";
import {
  listCategories,
  addCategory,
} from "../controllers/categories.controller";

const router = Router();

// Получить все категории
router.get("/", listCategories);

// Добавить новую категорию
router.post("/", addCategory);

export default router;
