import { MailtrapMailProvider } from "../../../providers/MailProviders/implementations/MailtrapMailProvider";
import { PrismaPostgresUsersReporitory } from "../../../repositories/Prisma/Postgres/User";
import { RequestUserController } from "./RequestUserController";
import { RequestUserUseCase } from "./RequestUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const prismaPostgresUsersReporitory = new PrismaPostgresUsersReporitory();

const requestUserUseCase = new RequestUserUseCase(
	prismaPostgresUsersReporitory,
	mailtrapMailProvider
);

const requestUserController = new RequestUserController(requestUserUseCase);

export { requestUserUseCase, requestUserController };
