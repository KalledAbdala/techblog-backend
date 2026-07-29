import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";

export class ArticleLikeService {

    async like(articleId: number, userId: number) {

    const article = await prisma.article.findUnique({
        where: {
        id: articleId,
        },
    });

    if (!article) {
        throw new AppError("Artigo não encontrado.", 404);
    }

    const alreadyLiked = await prisma.articleLike.findUnique({
        where: {
        userId_articleId: {
            userId,
            articleId,
        },
        },
    });

    if (alreadyLiked) {
        throw new AppError("Você já curtiu este artigo.", 409);
    }

    await prisma.articleLike.create({
        data: {
        userId,
        articleId,
        },
    });

    return {
        message: "Artigo curtido com sucesso.",
    };
    }

    async unlike(articleId: number, userId: number) {

    const like = await prisma.articleLike.findUnique({
        where: {
            userId_articleId: {
                userId,
                articleId,
            },
        },
    });

    if (!like) {
        throw new AppError("Você ainda não curtiu este artigo.", 404);
    }

    await prisma.articleLike.delete({
        where: {
            userId_articleId: {
                userId,
                articleId,
            },
        },
    });

    return {
        message: "Curtida removida com sucesso.",
    };
}

    async count(articleId: number) {

    const article = await prisma.article.findUnique({
        where: {
            id: articleId,
        },
    });

    if (!article) {
        throw new AppError("Artigo não encontrado.", 404);
    }

    const likes = await prisma.articleLike.count({
        where: {
            articleId,
        },
    });

    return {
        likes,
    };
}

}