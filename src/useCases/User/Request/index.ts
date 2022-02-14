import { MailtrapMailProvider } from "../../../providers/MailProviders/implementations/MailtrapMailProvider";
import { PrismaPostgresUsersReporitory } from "../../../repositories/Users/implementations/PrismaPostgresRepository";
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
