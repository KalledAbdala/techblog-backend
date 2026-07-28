import { Router } from "express";

import { ArticleController } from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const articleRouter = Router();

const articleController = new ArticleController();

articleRouter.post(
    "/",
    authMiddleware,
    asyncHandler(
    articleController.create.bind(articleController)
    )
);

articleRouter.get(
    "/",
    asyncHandler(
    articleController.findAll.bind(articleController)
    )
);

articleRouter.get(
    "/:slug",
    asyncHandler(
    articleController.findBySlug.bind(articleController)
    )
);

articleRouter.put(
    "/:id",
    authMiddleware,
    asyncHandler(
    articleController.update.bind(articleController)
    )
);

articleRouter.delete(
    "/:id",
    authMiddleware,
    asyncHandler(
    articleController.delete.bind(articleController)
    )
);

export { articleRouter };