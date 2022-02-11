import { PrismaPostgresUsersReporitory } from "../../../repositories/users/implementations/PrismaPostgresUsersRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const prismaPostgresUsersRepository = new PrismaPostgresUsersReporitory();

const authenticateUserUseCase = new AuthenticateUserUseCase(
	prismaPostgresUsersRepository
);

const authenticateUserController = new AuthenticateUserController(
	authenticateUserUseCase
);

export { authenticateUserUseCase, authenticateUserController }
