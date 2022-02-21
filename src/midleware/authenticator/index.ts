import { JsonwebtokenProvider } from "../../providers/TokenProviders/implementations/JsonwebtokenProvider";
import { PrismaPostgresBlackListTokensReporitory } from "../../repositories/Prisma/Postgres/BlackListTokens";
import { PrismaPostgresUsersReporitory } from "../../repositories/Prisma/Postgres/User";
import { AuthenticatorController } from "./AuthenticatorController";
import { AuthenticatorUseCase } from "./AuthenticatorUseCase";

const prismaPostgresUsersReporitory = new PrismaPostgresUsersReporitory();
const prismaPostgresBlackListTokensReporitory =
	new PrismaPostgresBlackListTokensReporitory();
const tokenProvider = new JsonwebtokenProvider();

const authenticatorUseCase = new AuthenticatorUseCase(
	prismaPostgresUsersReporitory,
	prismaPostgresBlackListTokensReporitory,
	tokenProvider
);

const authenticatorController = new AuthenticatorController(
	authenticatorUseCase
);

export { authenticatorUseCase, authenticatorController };
