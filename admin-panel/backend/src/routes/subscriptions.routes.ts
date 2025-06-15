import { Router } from "express";
import {
  listSubscriptions,
  addSubscription,
} from "../controllers/subscriptions.controller";

const router = Router();

// Получить все подписки
router.get("/", listSubscriptions);

// Добавить новую подписку
router.post("/", addSubscription);

export default router;
