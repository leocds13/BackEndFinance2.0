import { PrismaPostgresUsersReporitory } from "../../../repositories/Users/implementations/PrismaPostgresRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const prismaPostgresUsersRepository = new PrismaPostgresUsersReporitory();

const updateUserUseCase = new UpdateUserUseCase(prismaPostgresUsersRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };
