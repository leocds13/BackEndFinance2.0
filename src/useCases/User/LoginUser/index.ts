import { JsonwebtokenProvider } from "../../../providers/TokenProviders/implementations/JsonwebtokenProvider";
import { PrismaPostgresUsersReporitory } from "../../../repositories/Users/implementations/PrismaPostgresRepository";
import { LoginUserController } from "./LoginUserController";
import { LoginUserUseCase } from "./LoginUserUseCase";

const prismaPostgresUsersRepository = new PrismaPostgresUsersReporitory();
const tokenProvider = new JsonwebtokenProvider();

const loginUserUseCase = new LoginUserUseCase(
	prismaPostgresUsersRepository,
	tokenProvider
);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserUseCase, loginUserController };
