import { JsonwebtokenProvider } from "../../../providers/TokenProviders/implementations/JsonwebtokenProvider";
import { PrismaPostgresBlackListTokensReporitory } from "../../../repositories/Prisma/Postgres/BlackListTokens";
import { LogoutUserController } from "./LogoutUserController";
import { LogoutUserUseCase } from "./LogoutUserUseCase";

const prismaPostgresBlackListTokensReporitory = new PrismaPostgresBlackListTokensReporitory();
const tokenProvider = new JsonwebtokenProvider();

const logoutUserUseCase = new LogoutUserUseCase(
	prismaPostgresBlackListTokensReporitory,
	tokenProvider
);

const logoutUserController = new LogoutUserController(logoutUserUseCase);

export { logoutUserUseCase, logoutUserController };
