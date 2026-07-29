import type { Request, Response } from "express";
import { CommentService } from "../services/comment.service.js";
import { createCommentSchema } from "../schemas/comment.schema.js";

export class CommentController {
    private commentService = new CommentService();

    async create(req: Request, res: Response) {
    const articleId = Number(req.params.articleId);

    const userId = req.user.id;

    const data = createCommentSchema.parse(req.body);

    const comment = await this.commentService.create(
        articleId,
        userId,
        data
    );

    return res.status(201).json(comment);
    }

    async findByArticle(req: Request, res: Response) {
    const articleId = Number(req.params.articleId);

    const comments = await this.commentService.findByArticle(articleId);

    return res.json(comments);
    }

    async remove(req: Request, res: Response) {

    const commentId = Number(req.params.id);

    const result = await this.commentService.remove(
    commentId,
    req.user.id,
    req.user.role
    );

    return res.json(result);
}

}