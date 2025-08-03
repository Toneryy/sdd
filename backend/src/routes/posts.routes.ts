// landing/src/routes/posts.routes.ts
import { Router } from "express";
import { getPost } from "../controllers/posts.controller";

const router = Router();
router.get("/", getPost); // GET /api/posts
export default router;
