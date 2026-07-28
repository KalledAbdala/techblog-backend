import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
    .string()
    .min(3, "O nome deve possuir no mínimo 3 caracteres.")
    .max(50, "O nome deve possuir no máximo 50 caracteres."),

    color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida. Utilize o formato hexadecimal."),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;