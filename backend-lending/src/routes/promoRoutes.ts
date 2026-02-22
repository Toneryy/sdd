import { Router } from "express";
import { applyPromoCode, getUsedPromos, removeUsedPromo } from "../controllers/promoController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/apply", authMiddleware, applyPromoCode);
router.get("/used",   authMiddleware, getUsedPromos);
router.delete("/:code", authMiddleware, removeUsedPromo);

export default router;
