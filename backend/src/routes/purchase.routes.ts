// src/routes/purchase.routes.ts
import { Router } from "express";
import { purchaseProduct } from "../controllers/purchase.controller";

const router = Router();

// Совершить покупку товара
router.post("/purchase", purchaseProduct);

export default router;
