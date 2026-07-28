import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";
import type { CreateCategoryDTO } from "../schemas/category.schema.js";

export class CategoryService {
    async create(data: CreateCategoryDTO) {
    const slug = data.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    const categoryExists = await prisma.category.findUnique({
        where: {
        slug,
        },
    });

    if (categoryExists) {
        throw new AppError("Categoria já cadastrada.", 409);
    }

    return prisma.category.create({
        data: {
        ...data,
        slug,
        },
    });
    }
}