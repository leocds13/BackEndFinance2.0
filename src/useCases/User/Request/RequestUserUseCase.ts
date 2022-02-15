import { ErrorExeption } from "../../../entities/ErrorExeption";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/Users/IUsersRepository";
import { IUseCase } from "../../IUseCase";
import { IRequestUserRequestDTO } from "./RequestUserDTO";

export class RequestUserUseCase implements IUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute(data: IRequestUserRequestDTO): Promise<(User | null)[]> {
		let users: (User | null)[];

		switch (data.type) {
			case "id":
				users = [
					await this.usersRepository.findById(<string>data.value),
				];
				break;

			case "email":
				users = [
					await this.usersRepository.findByEmail(<string>data.value),
				];
				break;

			case "all":
				if (data.value) {
					users = await this.usersRepository.findAll();
				} else {
					users = [await this.usersRepository.findById(data.user_id)];
				}
				break;

			default:
				throw new ErrorExeption({
					status: 500,
					err: "There was an error on validate on witch type of request you want, please contact the suport!",
				});
		}

		if (users.length === 0) {
			throw new ErrorExeption({
				status: 400,
				err: "User not founded",
			});
		}

		return users;
	}
}
