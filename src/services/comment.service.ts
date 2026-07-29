import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";
import type { CreateCommentDTO } from "../schemas/comment.schema.js";

export class CommentService {

    async create(
    articleId: number,
    userId: number,
    data: CreateCommentDTO
    ) {

    const article = await prisma.article.findUnique({
        where: {
        id: articleId,
        },
    });

    if (!article) {
        throw new AppError("Artigo não encontrado.", 404);
    }

    return prisma.comment.create({
        data: {
        content: data.content,
        articleId,
        userId,
        },
        include: {
        user: {
            select: {
            id: true,
            name: true,
            },
        },
        },
    });

    }

    async findByArticle(articleId: number) {

    return prisma.comment.findMany({
        where: {
        articleId,
        },
    include: {
        user: {
            select: {
            id: true,
            name: true,
            },
        },
        },
    orderBy: {
        createdAt: "desc",
        },
    });

    }

    async remove(commentId: number, userId: number, role: string) {
    const comment = await prisma.comment.findUnique({
    where: {
        id: commentId,
    },
    });

    if (!comment) {
    throw new AppError("Comentário não encontrado.", 404);
    }

    const isOwner = comment.userId === userId;
    const isAdmin = role === "ADMIN";

    if (!isOwner && !isAdmin) {
    throw new AppError(
        "Você não tem permissão para excluir este comentário.",
        403
    );
    }

    await prisma.comment.delete({
    where: {
        id: commentId,
    },
    });

    return {
    message: "Comentário removido com sucesso.",
    };
}

}