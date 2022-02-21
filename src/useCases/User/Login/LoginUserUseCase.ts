import { compare } from "bcrypt";
import { ErrorExeption } from "../../../entities/ErrorExeption";
import { ITokenProvider } from "../../../providers/TokenProviders/ITokenProvider";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IUseCase } from "../../../types";
import { ILoginUserRequestDTO } from "./LoginUserDTO";

export class LoginUserUseCase implements IUseCase {
	constructor(
		private usersRepository: IUsersRepository,
		private tokenProvider: ITokenProvider
	) {}

	async execute(data: ILoginUserRequestDTO): Promise<string> {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user) {
			throw new ErrorExeption({
				status: 400,
				err: "Email not found!",
			});
		}
		
		if (user.authenticated === false) {
			throw new ErrorExeption({
				status: 400,
				err: "User not authenticate, please valid your email!",
			});
		}

		const passValidated = await compare(data.password, user.password);

		if (!passValidated) {
			throw new ErrorExeption({
				status: 400,
				err: "Wrong password!",
			});
		}

		const token = await this.tokenProvider.assing(user.id);

		return token;
	}
}
