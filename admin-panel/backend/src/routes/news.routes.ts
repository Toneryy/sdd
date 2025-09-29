// src/routes/news.routes.ts
import { Router } from "express";
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/news.controller";

const router = Router();

// Все новости (можно ?published=true/false)
router.get("/", getNews);

// Одна новость
router.get("/:id", getNewsById);

// CRUD (для админки)
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;
