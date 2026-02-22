// backend/src/routes/keys_aliases.routes.ts
import { Router } from "express";
import {
  listAliasKeys,
  deleteAliasKey,
} from "../controllers/keys_aliases.controller";

const router = Router();

router.get("/", listAliasKeys);
router.delete("/:id", deleteAliasKey);

export default router;
