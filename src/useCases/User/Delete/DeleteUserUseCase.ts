import { ErrorExeption } from "../../../entities/ErrorExeption";
import { IUsersRepository } from "../../../repositories/Users/IUsersRepository";
import { IUseCase } from "../../IUseCase";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase implements IUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute(data: IDeleteUserRequestDTO): Promise<void> {
		if (data.params_id !== data.user_id) {
			throw new ErrorExeption({
				status: 400,
				err: "You can't delete other users!",
			});
		}

		const userExists = await this.usersRepository.findById(data.params_id);

		if (!userExists) {
			throw new ErrorExeption({
				status: 400,
				err: "User not found!",
			});
		}

		await this.usersRepository.delete(data.params_id);
	}
}
