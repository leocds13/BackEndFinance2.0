import { PrismaPostgresUsersReporitory } from "../../../repositories/Users/implementations/PrismaPostgresRepository";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const prismaPostgresUsersRepository = new PrismaPostgresUsersReporitory();

const deleteUserUseCase = new DeleteUserUseCase(prismaPostgresUsersRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export {deleteUserUseCase, deleteUserController}