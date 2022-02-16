import { PrismaPostgresCategoryReporitory } from "../../../repositories/Category/implementations/PrismaPostgresRepository";
import { RequestCategoryController } from "./RequestCategoryController";
import { RequestCategoryUseCase } from "./RequestCategoryUseCase";

const prismaPostgresCategoryRepository = new PrismaPostgresCategoryReporitory();

const requestCategoryUseCase = new RequestCategoryUseCase(
	prismaPostgresCategoryRepository
);

const requestCategoryController = new RequestCategoryController(
	requestCategoryUseCase
);

export { requestCategoryUseCase, requestCategoryController };
