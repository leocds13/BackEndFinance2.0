import { ErrorExeption } from "../../entities/ErrorExeption";
import { User } from "../../entities/User";
import { ITokenProvider } from "../../providers/TokenProviders/ITokenProvider";
import { IBlackListTokensRepository } from "../../repositories/BlackListTokens/IBlackListTokensRepository";
import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { IUseCase } from "../../useCases/IUseCase";

export class AuthenticatorUseCase implements IUseCase {
	constructor(
		private usersRepository: IUsersRepository,
		private blackListTokensRepository: IBlackListTokensRepository,
		private tokenProvider: ITokenProvider
	) {}

	async execute(token: string): Promise<User> {
		const tokenObj = await this.blackListTokensRepository.findByToken(
			token
		);

		// Token BlackListed
		if (tokenObj) {
			throw new ErrorExeption({
				status: 401,
				err: "Token unactivated!",
			});
		}

		const id = await this.tokenProvider.verify(token);

		// Invalid Token
		if (!id) {
			throw new ErrorExeption({
				status: 401,
				err: "Invalid token!",
			});
		}

		// Buscando User
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new ErrorExeption({
				status: 400,
				err: "Invalid token!",
			});
		}

		return user;
	}
}
