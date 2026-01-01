// backend/src/routes/course.routes.js

import { Router } from "express";

import {
  importCourse,
  getCourses,
  getCourseById,
  updateProgress,
  deleteCourse,
  resyncCourse,
  validatePlaylist,
  saveVideoNote,
  getVideoSummary,
} from "../controllers/course.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { apiLimiter } from "../middlewares/rateLimit.middleware.js";

import {
  importCourseSchema,
  updateProgressSchema,
  courseIdParamSchema,
  saveNoteSchema,
} from "../validators/course.validator.js";

const router = Router();

// All course routes require authentication
router.use(protect);

router.post(
  "/validate",
  apiLimiter,
  // Optional: Add a simple body validator here if you wish
  validatePlaylist
);

// Import playlist (rate limited to protect YouTube quota)
router.post("/import", apiLimiter, validate(importCourseSchema), importCourse);

// Dashboard
router.get("/", getCourses);

// Single course (validate ID)
router.get("/:id", validate(courseIdParamSchema), getCourseById);

// Progress update (validate ID + body)
router.patch(
  "/:id/progress",
  validate(courseIdParamSchema),
  validate(updateProgressSchema),
  updateProgress
);

// Resync course (rate limited + validate ID)
router.post(
  "/:id/resync",
  apiLimiter,
  validate(courseIdParamSchema),
  resyncCourse
);

// Save video note (validate ID + body)
router.put(
  "/:id/note",
  validate(courseIdParamSchema),
  validate(saveNoteSchema),
  saveVideoNote
);

// Generate video summary (validate ID)
router.post("/:id/summary", validate(courseIdParamSchema), getVideoSummary);

// Delete course (validate ID)
router.delete("/:id", validate(courseIdParamSchema), deleteCourse);

export default router;
