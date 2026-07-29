import { z } from "zod";

export const createCommentSchema = z.object({
    content: z
    .string()
    .min(3, "Comentário muito curto.")
    .max(1000, "Comentário muito longo."),
});

export type CreateCommentDTO = z.infer<typeof createCommentSchema>;