import { z } from "zod";

export const addTagSchema = z.object({
    tagId: z.number().int().positive(),
});

export type AddTagDTO = z.infer<typeof addTagSchema>;