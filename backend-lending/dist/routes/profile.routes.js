"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/profile.routes.ts
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const profile_controller_1 = require("../controllers/profile.controller");
const router = (0, express_1.Router)();
// GET /api/profile
router.get("/", auth_middleware_1.authMiddleware, profile_controller_1.getProfile);
exports.default = router;
