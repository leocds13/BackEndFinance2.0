import { PrismaPostgresCategoryReporitory } from "../../../repositories/Category/implementations/PrismaPostgresRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const prismaPostgresCategoryRepository = new PrismaPostgresCategoryReporitory();

const createCategoryUseCase = new CreateCategoryUseCase(
	prismaPostgresCategoryRepository
);

const createCategoryController = new CreateCategoryController(
	createCategoryUseCase
);

export { createCategoryUseCase, createCategoryController };
