import { Router } from "express";

import { tagRouter } from "./tag.routes.js";

import { articleRouter } from "./article.routes.js";

import { categoryRouter } from "./category.routes.js";

import { authRouter } from "./auth.routes.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/tags", tagRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/articles", articleRouter);

router.get(
    "/me",
    (req, _, next) => {
    console.log(req.headers);
    next();
    },
    authMiddleware,
    (req, res) => {
    return res.json({
        user: req.user,
    });
    }
);

export { router };