// src/routes/shop.routes.ts
import { Router } from "express";
import {
  getCategories,
  getProducts,
  getProductById,
} from "../controllers/shop.controller";

const router = Router();

router.get("/categories", getCategories);
router.get("/products/:id", getProductById);
router.get("/products", getProducts);

export default router;
