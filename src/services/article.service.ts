import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";
import type {
    CreateArticleDTO,
    UpdateArticleDTO,
} from "../schemas/article.schema.js";

export class ArticleService {
    async create(data: CreateArticleDTO, authorId: number) {
    const category = await prisma.category.findUnique({
        where: {
        id: data.categoryId,
        },
    });

    if (!category) {
        throw new AppError("Categoria não encontrada.", 404);
    }

    const slug = data.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    const words = data.content.trim().split(/\s+/).length;

    const readingTime = Math.max(1, Math.ceil(words / 200));

    return prisma.article.create({
        data: {
        title: data.title,
        slug,
        summary: data.summary,
        content: data.content,
        readingTime,
        authorId,
        categoryId: data.categoryId,
        },
        include: {
        author: {
            select: {
            id: true,
            name: true,
            email: true,
            },
        },
        category: true,
        },
    });
    }

    async findAll(
    page = 1,
    limit = 10,
    categoryId?: number
) {
  const skip = (page - 1) * limit;

    const where = categoryId
    ? {
        categoryId,
        published: true,
        }
    : {
        published: true,
        };

    const [articles, total] = await Promise.all([
    prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
        createdAt: "desc",
        },
        include: {
        author: {
            select: {
            id: true,
            name: true,
            },
        },
        category: true,
        },
    }),

    prisma.article.count({
        where,
    }),
    ]);

    return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: articles,
    };
}

async findBySlug(slug: string) {
    const article = await prisma.article.findUnique({
    where: {
        slug,
    },
    include: {
        author: {
        select: {
            id: true,
            name: true,
            bio: true,
        },
        },
        category: true,
    },
    });

    if (!article) {
    throw new AppError("Artigo não encontrado.", 404);
    }

    await prisma.article.update({
    where: {
        id: article.id,
    },
    data: {
        views: {
        increment: 1,
        },
    },
    });

    return {
    ...article,
    views: article.views + 1,
    };
}

async update(id: number, data: UpdateArticleDTO) {
    const article = await prisma.article.findUnique({
    where: {
        id,
    },
    });

    if (!article) {
    throw new AppError("Artigo não encontrado.", 404);
    }

    const updateData: UpdateArticleDTO & {
    slug?: string;
    readingTime?: number;
    } = {
    ...data,
    };

    if (data.title) {
    updateData.slug = data.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
    }

    if (data.content) {
    const words = data.content.trim().split(/\s+/).length;

    updateData.readingTime = Math.max(
        1,
        Math.ceil(words / 200)
    );
    }

    return prisma.article.update({
    where: {
        id,
    },
    data: updateData,
    include: {
        author: {
        select: {
            id: true,
            name: true,
        },
        },
        category: true,
    },
    });
}

async delete(id: number) {
    const article = await prisma.article.findUnique({
        where: {
        id,
    },
    });

    if (!article) {
    throw new AppError("Artigo não encontrado.", 404);
    }

    await prisma.article.delete({
    where: {
        id,
    },
    });
}

async uploadBanner(
    id: number,
    filename: string
) {

    const article = await prisma.article.findUnique({
        where: {
            id,
        },
    });

    if (!article) {
        throw new AppError("Artigo não encontrado.", 404);
    }

    return prisma.article.update({
        where: {
            id,
        },
        data: {
            banner: filename,
        },
    });

}

}