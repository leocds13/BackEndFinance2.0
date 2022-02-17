import { PrismaPostgresCategoryReporitory } from "../../../repositories/Category/implementations/PrismaPostgresRepository";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

const prismaPostgresCategoryRepository = new PrismaPostgresCategoryReporitory()

const updateCategoryUseCase = new UpdateCategoryUseCase(prismaPostgresCategoryRepository);

const updateCategoryController = new UpdateCategoryController(updateCategoryUseCase);

export { updateCategoryController };
