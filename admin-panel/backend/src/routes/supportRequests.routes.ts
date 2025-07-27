import { Router } from "express";
import {
  listSupportRequests,
  updateSupportRequest,
  deleteSupportRequest,
} from "../controllers/supportRequests.controller";

const router = Router();

router.get("/", listSupportRequests);
router.put("/:id", updateSupportRequest);
router.delete("/:id", deleteSupportRequest);

export default router;
