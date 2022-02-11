import { ErrorExeption } from "../../../entities/ErrorExeption";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";
import { IUseCase } from "../../IUseCase";

export class AuthenticateUserUseCase implements IUseCase {
	constructor(
		private userRepository: IUsersRepository
	) {}

	async execute(authCode: string): Promise<void> {
		const user = await this.userRepository.findById(authCode);

        if(!user) {
            throw new ErrorExeption({
                status: 400,
                err: `Incorect Authentication Code!`
            })
        }

        await this.userRepository.update(user.id, {
            authenticated: true
        })
	}
}
