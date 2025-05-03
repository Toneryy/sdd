// backend/src/routes/profile.routes.ts
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/profile.controller";

const router = Router();

// GET /api/profile
router.get("/", authMiddleware, getProfile);

export default router;
