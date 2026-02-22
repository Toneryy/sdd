import { Router } from "express";
import {
  listStaffMembers,
  getStaffMemberById,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
} from "../controllers/staffMembers.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

// Закрываем эти ручки авторизацией (без ролей)
router.use(authenticateJWT);

router.get("/", listStaffMembers);
router.get("/:id", getStaffMemberById);
router.post("/", createStaffMember);
router.put("/:id", updateStaffMember);
router.delete("/:id", deleteStaffMember);

export default router;
