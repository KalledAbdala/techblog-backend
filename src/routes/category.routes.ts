import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.post(
    "/",
    authMiddleware,
    adminMiddleware,
    categoryController.create.bind(categoryController)
);

export { categoryRouter };