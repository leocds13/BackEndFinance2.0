import { PrismaPostgresCategoryReporitory } from "../../../repositories/Prisma/Postgres/Category";
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
