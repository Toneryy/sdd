import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { register, login, me, logout } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateJWT, me);
router.post("/logout", logout);

export default router;
