import { Category } from "../entities/Category";

export interface ICategoryRepository {
	findById(id: string): Promise<Category | null>;
	findByName(user_id: string, name: string): Promise<Category | null>;
	findByUserId(user_id: string): Promise<Category[] | null>;

	save(categ: Category): Promise<void>;
	update(categ: Partial<Category>): Promise<void>;
}
