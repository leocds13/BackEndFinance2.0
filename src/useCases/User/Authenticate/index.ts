import { PrismaPostgresUsersReporitory } from "../../../repositories/Users/implementations/PrismaPostgresRepository";
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
