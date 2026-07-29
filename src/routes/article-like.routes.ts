import { Router } from "express";
import { ArticleLikeController } from "../controllers/article-like.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const articleLikeRouter = Router();

const controller = new ArticleLikeController();

articleLikeRouter.post(
    "/articles/:id/like",
    authMiddleware,
    asyncHandler(controller.like.bind(controller))
);

articleLikeRouter.delete(
    "/articles/:id/like",
    authMiddleware,
    asyncHandler(
        controller.unlike.bind(controller)
    )
);

articleLikeRouter.get(
    "/articles/:id/likes",
    asyncHandler(
        controller.count.bind(controller)
    )
);

export { articleLikeRouter };