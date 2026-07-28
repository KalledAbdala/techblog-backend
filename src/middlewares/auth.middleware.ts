import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError.js";
import { jwtConfig } from "../config/jwt.js";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token não informado.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(
            token,
            jwtConfig.secret
        );

        const { id, role } = decoded as {
            id: number;
            role: string;
        };

        req.user = {
            id,
            role,
        };

        next();

    } catch {
        throw new AppError("Token inválido.", 401);
    }
}