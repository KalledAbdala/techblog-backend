import { Router } from "express";
import { TagController } from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const tagRouter = Router();

const tagController = new TagController();

tagRouter.get(
    "/",
    asyncHandler(tagController.findAll.bind(tagController))
);

tagRouter.post(
    "/",
    authMiddleware,
    adminMiddleware,
    asyncHandler(tagController.create.bind(tagController))
);

export { tagRouter };