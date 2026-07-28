import type { Request, Response } from "express";
import { CategoryService } from "../services/category.service.js";
import {
    createCategorySchema,
    updateCategorySchema,
} from "../schemas/category.schema.js";

export class CategoryController {
    private categoryService = new CategoryService();

    async create(req: Request, res: Response) {
    const data = createCategorySchema.parse(req.body);

    const category = await this.categoryService.create(data);

    return res.status(201).json(category);
    }

    async findAll(req: Request, res: Response) {
        const categories = await this.categoryService.findAll();

        return res.json(categories);
    }

    async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const category = await this.categoryService.findById(id);

    return res.json(category);
    }

    async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const data = updateCategorySchema.parse(req.body);

    const category = await this.categoryService.update(
    id,
    data
    );

    return res.json(category);
}

    async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await this.categoryService.delete(id);

    return res.status(204).send();
}

}