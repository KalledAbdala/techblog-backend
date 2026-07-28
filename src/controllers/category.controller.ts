import type { Request, Response } from "express";
import { CategoryService } from "../services/category.service.js";
import { createCategorySchema } from "../schemas/category.schema.js";

export class CategoryController {
    private categoryService = new CategoryService();

    async create(req: Request, res: Response) {
    const data = createCategorySchema.parse(req.body);

    const category = await this.categoryService.create(data);

    return res.status(201).json(category);
    }
}