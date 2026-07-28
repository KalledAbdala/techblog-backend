import { Router } from "express";

import { authRouter } from "./auth.routes.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/auth", authRouter);

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