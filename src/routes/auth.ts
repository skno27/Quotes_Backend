import { Router } from "express";

import * as authController from "../controllers/auth.js";
import * as validation from "../middleware/validation.js";

const router = Router();

router.post("/login", validation.login, authController.login);
router.post("/register", validation.createUser, authController.register);

export default router;
