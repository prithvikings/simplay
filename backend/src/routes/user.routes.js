import { Router } from "express";
import {
  trackTime,
  getTodayUsage,
  getProfile,
} from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.middleware.js"; // Import your specific middleware

const router = Router();

// Apply 'protect' to these routes
router.post("/track-time", protect, trackTime);
router.get("/today-usage", protect, getTodayUsage);
router.get("/profile", protect, getProfile);

export default router;
