// backend/src/routes/index.js

import { Router } from "express";

import authRoutes from "./auth.routes.js";
import courseRoutes from "./course.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/user", userRoutes);

export default router;
