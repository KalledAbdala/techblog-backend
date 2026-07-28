import { z } from "zod";

export const registerSchema = z
.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
});

export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
email: z.email(),
password: z.string().min(6),
});

export type LoginDTO = z.infer<typeof loginSchema>;