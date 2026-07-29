import { Router } from "express";
import { CommentController } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const commentRouter = Router();

const commentController = new CommentController();

commentRouter.post(
    "/articles/:articleId/comments",
    authMiddleware,
    asyncHandler(commentController.create.bind(commentController))
);

commentRouter.get(
    "/articles/:articleId/comments",
    asyncHandler(commentController.findByArticle.bind(commentController))
);

commentRouter.delete(
    "/comments/:id",
    authMiddleware,
    asyncHandler(commentController.remove.bind(commentController))
);

export { commentRouter };