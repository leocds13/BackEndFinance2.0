import { User } from "../../entities/User";

export interface IUsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;

	save(user: User): Promise<void>;
	update(id: string, payload: Partial<User>): Promise<void>;
}
