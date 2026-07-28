import type { Request, Response } from "express";

import { ArticleService } from "../services/article.service.js";
import {
    createArticleSchema,
    updateArticleSchema,
} from "../schemas/article.schema.js";


export class ArticleController {

    private articleService = new ArticleService();

    async create(req: Request, res: Response) {

    const data = createArticleSchema.parse(req.body);

    const article = await this.articleService.create(
        data,
        req.user.id
    );

    return res.status(201).json(article);

    }

    async findAll(req: Request, res: Response) {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const categoryId = req.query.categoryId
    ? Number(req.query.categoryId)
    : undefined;

    const articles = await this.articleService.findAll(
    page,
    limit,
    categoryId
    );

    return res.json(articles);

}

async findBySlug(req: Request, res: Response) {
    const { slug } = req.params;

    const article = await this.articleService.findBySlug(slug);

    return res.json(article);
}

async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const data = updateArticleSchema.parse(req.body);

    const article = await this.articleService.update(id, data);

    return res.json(article);
}

async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await this.articleService.delete(id);

    return res.status(204).send();
}

}