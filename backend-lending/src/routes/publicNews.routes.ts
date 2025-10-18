import { Router } from "express";
import {
  getPublishedNews,
  getPublishedNewsById,
} from "../controllers/publicNews.controller";

const router = Router();

// Публичные
router.get("/", getPublishedNews);
router.get("/:id", getPublishedNewsById);

export default router;
