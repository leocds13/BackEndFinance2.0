import { compare } from "bcrypt";
import { ErrorExeption } from "../../../entities/ErrorExeption";
import { ITokenProvider } from "../../../providers/TokenProviders/ITokenProvider";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";
import { IUseCase } from "../../IUseCase";
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
