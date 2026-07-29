import { Router } from "express";

import { upload } from "../config/multer.js";

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

articleRouter.post(
    "/:id/banner",
    authMiddleware,
    upload.single("banner"),
    asyncHandler(
        articleController.uploadBanner.bind(articleController)
    )
);

articleRouter.post(
    "/:id/tags",
    authMiddleware,
    asyncHandler(
        articleController.addTag.bind(articleController)
    )
);

articleRouter.get(
    "/:id/tags",
    asyncHandler(
        articleController.findTags.bind(articleController)
    )
);

articleRouter.delete(
    "/:id/tags/:tagId",
    authMiddleware,
    asyncHandler(
        articleController.removeTag.bind(articleController)
    )
);

export { articleRouter };