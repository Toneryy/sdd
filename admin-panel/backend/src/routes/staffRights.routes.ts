import { Router } from "express";
import {
  listStaffRights,
  listRightsForStaff,
  listRightsForMe, // ← ДОбАВИТЬ
  banFeature,
  deleteRight,
} from "../controllers/staffRights.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", listStaffRights);

// ← ДОбАВИТЬ ЭТО
router.get("/me", listRightsForMe);

router.get("/staff/:staffId", listRightsForStaff);
router.post("/ban", banFeature);
router.delete("/:id", deleteRight);

export default router;
