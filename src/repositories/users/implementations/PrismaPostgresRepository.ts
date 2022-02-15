import { PrismaClient } from "@prisma/client";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class PrismaPostgresUsersReporitory implements IUsersRepository {
	private prismaClient: PrismaClient;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	async findById(id: string): Promise<User | null> {
		const prismaUser = await this.prismaClient.user.findUnique({
			where: {
				id: id,
			},
		});

		const user =
			prismaUser &&
			new User(
				{
					email: prismaUser.email,
					name: prismaUser.name,
					password: prismaUser.password,
				},
				prismaUser.id
			);

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const prismaUser = await this.prismaClient.user.findUnique({
			where: {
				email: email,
			},
		});

		const user =
			prismaUser &&
			new User(
				{
					email: prismaUser.email,
					name: prismaUser.name,
					password: prismaUser.password,
				},
				prismaUser.id
			);

		return user;
	}

	async findAll(): Promise<User[]> {
		const users = await this.prismaClient.user.findMany();

		return users.map((user) => {
			return new User(
				{
					email: user.email,
					name: user.name,
					password: user.password,
					authenticated: user.authenticated,
				},
				user.id
			);
		});
	}

	async save(user: User): Promise<void> {
		await this.prismaClient.user.create({
			data: { ...user },
		});
	}

	async update(id: string, payload: Partial<User>): Promise<void> {
		await this.prismaClient.user.update({
			where: {
				id: id,
			},
			data: { ...payload },
		});
	}

	async delete(id: string): Promise<void> {
		await this.prismaClient.user.delete({
			where: { id },
		});
	}
}
