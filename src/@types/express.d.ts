import type { Role } from "@prisma/client";

declare namespace Express {
    export interface Request {
    user: {
        id: number;
        role: Role;
    };
    }
}