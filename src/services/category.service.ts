import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";
import type {
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from "../schemas/category.schema.js";

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

    async findAll() {
    return prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
    }

    async findById(id: number) {
    const category = await prisma.category.findUnique({
    where: {
        id,
    },
    });

    if (!category) {
    throw new AppError("Categoria não encontrada.", 404);
    }

    return category;
    }

    async update(
    id: number,
    data: UpdateCategoryDTO) {
    await this.findById(id);

    const updateData: UpdateCategoryDTO & {
    slug?: string;
    } = { ...data };

    if (data.name) {
    updateData.slug = data.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
    }

    return prisma.category.update({
    where: {
        id,
    },
    data: updateData,
    });
}

async delete(id: number) {
    await this.findById(id);

    await prisma.category.delete({
        where: {
            id,
        },
    });
}

}