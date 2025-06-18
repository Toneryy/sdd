// /src/routes/subscriptions.routes.ts
import { Router } from "express";
import {
  listSubscriptions,
  addSubscription,
  updateSubscription, // Добавлен новый маршрут для обновления
  deleteSubscription, // Добавлен новый маршрут для удаления
} from "../controllers/subscriptions.controller";

const router = Router();

// Получить все подписки
router.get("/", listSubscriptions);

// Добавить новую подписку
router.post("/", addSubscription);

// Обновить подписку по id
router.put("/:id", updateSubscription); // Маршрут для обновления

// Удалить подписку по id
router.delete("/:id", deleteSubscription); // Маршрут для удаления

export default router;
