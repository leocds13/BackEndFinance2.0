import { PrismaPostgresUsersReporitory } from "../../../repositories/Prisma/Postgres/User";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const prismaPostgresUsersRepository = new PrismaPostgresUsersReporitory();

const updateUserUseCase = new UpdateUserUseCase(prismaPostgresUsersRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
