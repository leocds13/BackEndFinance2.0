import { MailtrapMailProvider } from "../../../providers/MailProviders/implementations/MailtrapMailProvider";
import { PrismaPostgresUsersReporitory } from "../../../repositories/users/implementations/PrismaPostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const prismaPostgresUsersReporitory = new PrismaPostgresUsersReporitory();

const createUserUseCase = new CreateUserUseCase(
	prismaPostgresUsersReporitory,
	mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
