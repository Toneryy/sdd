// backend/src/routes/profile.routes.ts
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getProfile, getPurchases } from "../controllers/profile.controller";

const router = Router();

// GET /api/profile
router.get("/", authMiddleware, getProfile);

// GET /api/profile/purchases?page=1&pageSize=12
router.get("/purchases", authMiddleware, getPurchases);

export default router;
