// backend/src/routes/dbNameAliases.routes.ts
import { Router } from "express";
import {
  listDbNameAliases,
  updateDbNameAlias,
} from "../controllers/dbNameAliases.controller";

const router = Router();

router.get("/", listDbNameAliases);

// Маршрут для обновления алиаса
router.put("/:id", updateDbNameAlias);

export default router;
