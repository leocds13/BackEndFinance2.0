import { User } from "../../entities/User";

export interface IUsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findAll(): Promise<User[]>;
	
	save(user: User): Promise<void>;
	update(id: string, payload: Partial<User>): Promise<void>;
	delete(id: string): Promise<void>;
}
