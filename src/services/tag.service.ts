import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/AppError.js";
import type { CreateTagDTO } from "../schemas/tag.schema.js";

export class TagService {
    async create(data: CreateTagDTO) {
    const slug = data.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    const tagExists = await prisma.tag.findUnique({
        where: {
        slug,
        },
    });

    if (tagExists) {
        throw new AppError("Tag já cadastrada.", 409);
    }

    return prisma.tag.create({
        data: {
        name: data.name,
        slug,
        },
    });
    }

    async findAll() {
    return prisma.tag.findMany({
        orderBy: {
        name: "asc",
        },
    });
    }
}