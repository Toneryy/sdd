// backend/src/routes/staffMembers.routes.ts
import { Router } from "express";
import {
  listStaffMembers,
  getStaffMemberById,
  createStaffMember,
} from "../controllers/staffMembers.controller";

const router = Router();

router.get("/", listStaffMembers); // Получить всех сотрудников
router.get("/:id", getStaffMemberById); // Получить сотрудника по ID
router.post("/", createStaffMember); // Создать сотрудника

export default router;
