// backend/src/routes/auth.routes.js
import { Router } from "express";
import { googleLogin } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { googleLoginSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/google", validate(googleLoginSchema), googleLogin);

export default router;
