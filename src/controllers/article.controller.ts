import type { Request, Response } from "express";

import { addTagSchema } from "../schemas/article-tag.schema.js";

import { AppError } from "../errors/AppError.js";

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

    const search = req.query.search as string | undefined;

    const category = req.query.category as string | undefined;

    const tag = req.query.tag as string | undefined;

    const articles = await this.articleService.findAll(
        page,
        limit,
        search,
        category,
        tag
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

async uploadBanner(req: Request, res: Response) {

    const id = Number(req.params.id);

    if (!req.file) {
        throw new AppError("Imagem não enviada.", 400);
    }

    const article = await this.articleService.uploadBanner(
        id,
        req.file.filename
    );

    return res.json(article);
}

async addTag(req: Request, res: Response) {

    const articleId = Number(req.params.id);

    const data = addTagSchema.parse(req.body);

    const result = await this.articleService.addTag(
        articleId,
        data
    );

    return res.json(result);
}

    async findTags(req: Request, res: Response) {

    const articleId = Number(req.params.id);

    const tags = await this.articleService.findTags(articleId);

    return res.json(tags);
}

async removeTag(req: Request, res: Response) {

    const articleId = Number(req.params.id);
    const tagId = Number(req.params.tagId);

    const result = await this.articleService.removeTag(
        articleId,
        tagId
    );

    return res.json(result);
}

}