// backend/src/routes/subscriptions.routes.ts
import { Router } from "express";
import {
  listSubscriptions,
  getSubscriptionById,
} from "../controllers/subscriptions.controller";

const router = Router();

router.get("/", listSubscriptions);
router.get("/:id", getSubscriptionById);

export default router;
