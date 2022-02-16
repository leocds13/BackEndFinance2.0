import { PrismaClient } from "@prisma/client";
import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../ICategoryRepository";

export class PrismaPostgresCategoryReporitory implements ICategoryRepository {
	private prismaClient: PrismaClient;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	async findById(id: string): Promise<Category | null> {
		const prismaCateg = await this.prismaClient.categories.findUnique({
			where: { id },
		});

        const categ = prismaCateg && new Category({
            ...prismaCateg
        }, prismaCateg.id)

        return categ
	}

	async findByName(user_id: string, name: string): Promise<Category | null> {
		const prismaCateg = await this.prismaClient.categories.findFirst({
			where: { user_id, name },
		});

        const categ = prismaCateg && new Category({
            ...prismaCateg
        }, prismaCateg.id)

        return categ
	}

	async findByUserId(user_id: string): Promise<Category[] | null> {
		const prismaCateg = await this.prismaClient.categories.findMany({
			where: { user_id },
		});

        const categs = prismaCateg && prismaCateg.map((categVal) => {
			return new Category({
				...categVal
			}, categVal.id)
		})

        return categs
	}

	async save(categ: Category): Promise<void> {
		await this.prismaClient.categories.create({
			data: {
				...categ
			}
		})
	}
}
