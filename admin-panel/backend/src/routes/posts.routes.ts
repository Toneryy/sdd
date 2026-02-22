import { Router } from "express";
import {
  getPost,
  upsertPost,
  deletePost,
} from "../controllers/posts.controller";
import {
  listDrafts,
  createDraft,
  updateDraft,
  deleteDraft,
} from "../controllers/drafts.controller";

const router = Router();

// ——— Главный пост — слушаем корень роутинга ———
router.get("/", getPost);
router.put("/", upsertPost);
router.delete("/", deletePost);

// ——— Черновики — под роутом /drafts ———
router.get("/drafts", listDrafts);
router.post("/drafts", createDraft);
router.put("/drafts/:id", updateDraft);
router.delete("/drafts/:id", deleteDraft);

export default router;
