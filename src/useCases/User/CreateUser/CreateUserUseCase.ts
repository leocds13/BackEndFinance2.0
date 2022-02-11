import { ErrorExeption } from "../../../entities/ErrorExeption";
import { User } from "../../../entities/User";
import { IMailProvider } from "../../../providers/MailProviders/IMailProvider";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
	constructor(
		private usersRepository: IUsersRepository,
		private mailProvider: IMailProvider
	) {}

	async execute(data: ICreateUserRequestDTO): Promise<void> {
		const userAlreadyExists = await this.usersRepository.findByEmail(
			data.email
		);

		if (userAlreadyExists) {
			throw new ErrorExeption({
				status: 400,
				err: "User Already exists!",
			});
		}

		const user = new User(data);

		await this.usersRepository.save(user);

		await this.mailProvider.sendEmail({
			to: {
				email: data.email,
				name: data.name,
			},
			from: {
				email: "noReply@fake.email",
				name: "Company",
			},
			subject: "Seja bem vindo ao nosso app",
			body:
				`<h2>Cadastro Realizado com sucesso!</h2>` +
				`<p>Agora basta acessar o link abaixo para reconhecermos que é você mesmo</p><br/>` +
				`<a href="${process.env.API_URL}users\\authenticate\\${user.id}">${process.env.API_URL}users\\authenticate</a><br/>` +
				`<p>Caso não fez cadastro em nossa plataforme por favor ignore!</p>`
		});
	}
}
