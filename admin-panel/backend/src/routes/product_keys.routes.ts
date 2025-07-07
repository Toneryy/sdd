import { Router } from "express";
import {
  listProductKeys,
  addProductKey,
  updateProductKey,
  deleteProductKey,
} from "../controllers/product_keys.controller";

const router = Router();

router.get("/", listProductKeys);
router.post("/", addProductKey);
router.put("/:id", updateProductKey);
router.delete("/:id", deleteProductKey);

export default router;
