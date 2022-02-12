import { ErrorExeption } from "../../../entities/ErrorExeption";
import { Token } from "../../../entities/Token";
import { ITokenProvider } from "../../../providers/TokenProviders/ITokenProvider";
import { IBlackListTokensRepository } from "../../../repositories/BlackListTokens/IBlackListTokensRepository";
import { IUseCase } from "../../IUseCase";
import { ILogoutUserRequestDTO } from "./LogoutUserDTO";

export class LogoutUserUseCase implements IUseCase {
	constructor(
		private blackListTokensRepository: IBlackListTokensRepository,
		private tokenProvider: ITokenProvider
	) {}

	async execute(data: ILogoutUserRequestDTO): Promise<void> {
		const id = await this.tokenProvider.verify(data.token);

		if (!id) {
			throw new ErrorExeption({
				status: 401,
				err: "Invalid token!",
			});
		}

		const token = new Token({
			token: data.token,
			user_id: id,
		});

		await this.blackListTokensRepository.create(token);
	}
}
