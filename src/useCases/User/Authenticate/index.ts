import { PrismaPostgresUsersReporitory } from "../../../repositories/Prisma/Postgres/User";
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
