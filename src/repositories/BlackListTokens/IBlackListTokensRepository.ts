import { Token } from "../../entities/Token";

export interface IBlackListTokensRepository {
	findByToken(token: string): Promise<Token | null>;
	findByUserId(user_id: string): Promise<Token[] | null>;

	create(token: Token): Promise<void>;
	delete(token: string): Promise<void>;
}
