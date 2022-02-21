import { PrismaClient } from "@prisma/client";
import { Token } from "../../../entities/Token";
import { IBlackListTokensRepository } from "../../IBlackListTokensRepository";

export class PrismaPostgresBlackListTokensReporitory
	implements IBlackListTokensRepository
{
	private prismaClient: PrismaClient;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	async findByToken(token: string): Promise<Token | null> {
		const prismaToken = await this.prismaClient.blacklisttokens.findUnique({
			where: {
				token,
			},
		});

		const tokenEntity =
			prismaToken &&
			new Token({
				token: prismaToken.token,
				user_id: prismaToken.user_id,
			});

		return tokenEntity;
	}

	async findByUserId(user_id: string): Promise<Token[] | null> {
		const prismaTokens = await this.prismaClient.blacklisttokens.findMany({
			where: {
				user_id,
			},
		});

		const tokenEntity =
			prismaTokens &&
			prismaTokens.map(({ token, user_id }) => {
				return new Token({
					token,
					user_id,
				});
			});

		return tokenEntity;
	}

	async create(token: Token): Promise<void> {
		await this.prismaClient.blacklisttokens.create({
			data: {
				...token,
			},
		});
	}

	async delete(token: string): Promise<void> {
		await this.prismaClient.blacklisttokens.delete({
			where: {
				token,
			},
		});
	}
}
