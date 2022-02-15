import { ErrorExeption } from "../../../entities/ErrorExeption";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/Users/IUsersRepository";
import { IUseCase } from "../../IUseCase";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";

export class UpdateUserUseCase implements IUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute(user: IUpdateUserRequestDTO): Promise<void> {		
        if (user.email) {
			const userAlreadyExists = await this.usersRepository.findByEmail(
				user.email
			);

			if (userAlreadyExists) {
				throw new ErrorExeption({
					status: 400,
					err: "Email already in use!",
				});
			}
		}

		if (user.password) {
			const tempUser = new User({
				password: user.password,
				name: user.name || "",
				email: user.email || "",
			});

			user.password = tempUser.password;
		}

		await this.usersRepository.update(user.id, user);
	}
}
