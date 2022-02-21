import { PrismaPostgresCategoryReporitory } from "../../../repositories/Prisma/Postgres/Category";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

const prismaPostgresCategoryRepository = new PrismaPostgresCategoryReporitory()

const updateCategoryUseCase = new UpdateCategoryUseCase(prismaPostgresCategoryRepository);

const updateCategoryController = new UpdateCategoryController(updateCategoryUseCase);

export { updateCategoryController };
