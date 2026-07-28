import { asyncHandler } from "../utils/asyncHandler.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.get(
    "/",
    asyncHandler(
        categoryController.findAll.bind(categoryController)
    )
);

categoryRouter.get(
    "/:id",
    asyncHandler(
        categoryController.findById.bind(categoryController)
    )
);

categoryRouter.post(
    "/",
    authMiddleware,
    adminMiddleware,
    asyncHandler(
        categoryController.create.bind(categoryController)
    )
);

categoryRouter.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    asyncHandler(
    categoryController.update.bind(categoryController)
    )
);

categoryRouter.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    asyncHandler(
        categoryController.delete.bind(categoryController)
    )
);

export { categoryRouter };