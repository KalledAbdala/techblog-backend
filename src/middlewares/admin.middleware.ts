import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function adminMiddleware(
    req: Request,
    _: Response,
    next: NextFunction
) {
    if (req.user.role !== "ADMIN") {
    throw new AppError(
        "Você não possui permissão para acessar este recurso.",
        403
    );
    }

    next();
}