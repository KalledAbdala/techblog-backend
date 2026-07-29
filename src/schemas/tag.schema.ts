import { z } from "zod";

export const createTagSchema = z.object({
    name: z
    .string()
    .min(2, "Nome muito curto.")
    .max(30, "Nome muito longo."),
});

export type CreateTagDTO = z.infer<typeof createTagSchema>;