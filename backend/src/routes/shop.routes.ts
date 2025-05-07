import { Router } from "express";
import {
  getCategories,
  getProducts,
  getProductById,
} from "../controllers/shop.controller";

const router = Router();

// Сначала конкретный маршрут по id:
router.get("/products/:id", getProductById);

// А затем общий список:
router.get("/categories", getCategories);
router.get("/products", getProducts);

export default router;
