import type { Request, Response } from "express";
import { TagService } from "../services/tag.service.js";
import { createTagSchema } from "../schemas/tag.schema.js";

export class TagController {
    private tagService = new TagService();

    async create(req: Request, res: Response) {
    const data = createTagSchema.parse(req.body);

    const tag = await this.tagService.create(data);

    return res.status(201).json(tag);
    }

    async findAll(req: Request, res: Response) {
    const tags = await this.tagService.findAll();

    return res.json(tags);
    }
}