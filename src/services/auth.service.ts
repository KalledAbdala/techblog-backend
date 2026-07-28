import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";
import { jwtConfig } from "../config/jwt.js";

import type { RegisterDTO, LoginDTO } from "../schemas/auth.schema.js";

export class AuthService {
async login(data: LoginDTO) {
const user = await prisma.user.findUnique({
    where: {
    email: data.email,
    },
});

if (!user) {
    throw new AppError("E-mail ou senha inválidos.", 401);
}

const passwordMatch = await bcrypt.compare(
    data.password,
    user.password
);

if (!passwordMatch) {
    throw new AppError("E-mail ou senha inválidos.", 401);
}

const token = jwt.sign(
{
    id: user.id,
    role: user.role,
},
jwtConfig.secret,
{
    expiresIn: "7d",
}
);

const { password, ...userWithoutPassword } = user;

return {
    user: userWithoutPassword,
    token,
};
}

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