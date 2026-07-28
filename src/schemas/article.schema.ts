import { z } from "zod";

export const createArticleSchema = z.object({
    title: z
    .string()
    .min(5, "O título deve ter no mínimo 5 caracteres.")
    .max(150, "O título deve ter no máximo 150 caracteres."),

    summary: z
    .string()
    .min(10, "O resumo deve ter no mínimo 10 caracteres."),

    content: z
    .string()
    .min(100, "O conteúdo deve ter no mínimo 100 caracteres."),

    categoryId: z.number(),
});

export const updateArticleSchema = z.object({
    title: z.string().min(5).max(150).optional(),

    summary: z.string().min(10).optional(),

    content: z.string().min(100).optional(),

    categoryId: z.number().optional(),

    published: z.boolean().optional(),
});

export type UpdateArticleDTO = z.infer<typeof updateArticleSchema>;

export type CreateArticleDTO = z.infer<typeof createArticleSchema>;