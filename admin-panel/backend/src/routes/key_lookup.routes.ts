import { Router } from "express";
import { lookupKey } from "../controllers/key_lookup.controller";

const router = Router();
router.get("/:raw", lookupKey);
export default router;
