import type { Request, Response } from "express";
import { ArticleLikeService } from "../services/article-like.service.js";

export class ArticleLikeController {

    private articleLikeService = new ArticleLikeService();

async like(req: Request, res: Response) {

    const articleId = Number(req.params.id);

    const result = await this.articleLikeService.like(
        articleId,
        req.user.id
    );

    return res.json(result);
    }

async unlike(req: Request, res: Response) {

    const articleId = Number(req.params.id);

    const result = await this.articleLikeService.unlike(
        articleId,
        req.user.id
    );

    return res.json(result);
}

async count(req: Request, res: Response) {

    const articleId = Number(req.params.id);

    const result = await this.articleLikeService.count(articleId);

    return res.json(result);
}

}