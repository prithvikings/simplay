import { Router } from 'express';

import {
  importCourse,
  getCourses,
  getCourseById,
  updateProgress,
  deleteCourse,
  resyncCourse,
} from '../controllers/course.controller.js';

import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { apiLimiter } from '../middlewares/rateLimit.middleware.js';

import {
  importCourseSchema,
  updateProgressSchema,
  courseIdParamSchema,
} from '../validators/course.validator.js';

const router = Router();

// All course routes require authentication
router.use(protect);

// Import playlist (rate limited to protect YouTube quota)
router.post(
  '/import',
  apiLimiter,
  validate(importCourseSchema),
  importCourse
);

// Dashboard
router.get('/', getCourses);

// Single course (validate ID)
router.get(
  '/:id',
  validate(courseIdParamSchema),
  getCourseById
);

// Progress update (validate ID + body)
router.patch(
  '/:id/progress',
  validate(courseIdParamSchema),
  validate(updateProgressSchema),
  updateProgress
);

// Resync course (rate limited + validate ID)
router.post(
  '/:id/resync',
  apiLimiter,
  validate(courseIdParamSchema),
  resyncCourse
);

// Delete course (validate ID)
router.delete(
  '/:id',
  validate(courseIdParamSchema),
  deleteCourse
);

export default router;
