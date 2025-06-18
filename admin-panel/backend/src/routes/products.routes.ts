// backend/src/routes/products.routes.ts
import { Router } from "express";
import {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";

const router = Router();

// Получение всех товаров
router.get("/", listProducts);

// Добавление товара
router.post("/", addProduct);

// Обновление товара по ID
router.put("/:id", updateProduct);

router.delete('/:id', deleteProduct);

export default router;
