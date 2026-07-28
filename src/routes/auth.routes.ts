import { Router } from "express";

import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
"/register",
validate(registerSchema),
authController.register.bind(authController)
);

authRouter.post(
"/login",
authController.login.bind(authController)
);

export { authRouter };