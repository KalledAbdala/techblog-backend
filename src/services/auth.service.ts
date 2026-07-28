import { AppError } from "../errors/AppError.js";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import type { RegisterDTO } from "../schemas/auth.schema.js";

export class AuthService {
async register(data: RegisterDTO) {
    const { confirmPassword, ...userData } = data;

    const userExists = await prisma.user.findUnique({
    where: {
        email: userData.email,
    },
    });

    if (userExists) {
    throw new AppError("E-mail já cadastrado.", 409);
    }

    const hashedPassword = await bcrypt.hash(
    userData.password,
    10
    );

    const user = await prisma.user.create({
    data: {
        ...userData,
        password: hashedPassword,
    },
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
}
}