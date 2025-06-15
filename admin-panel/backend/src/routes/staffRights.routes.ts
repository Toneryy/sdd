// backend/src/routes/staffRights.routes.ts
import { Router } from "express";
import {
  listStaffRights,
  createStaffRights,
} from "../controllers/staffRights.controller";

const router = Router();

router.get("/", listStaffRights); // Получить все права доступа
router.post("/", createStaffRights); // Создать права доступа для роли

export default router;
