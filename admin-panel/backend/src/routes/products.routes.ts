// backend/src/routes/products.routes.ts
import { Router } from "express";
import { listProducts, addProduct } from "../controllers/products.controller";

const router = Router();

router.get("/", listProducts);
router.post("/", addProduct);

export default router;
