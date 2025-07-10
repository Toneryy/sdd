// backend/src/routes/orders.routes.ts
import { Router } from "express";
import { updateServiceOrder } from "../controllers/users.controller";

const router = Router();

router.put("/:id", updateServiceOrder);

export default router;
