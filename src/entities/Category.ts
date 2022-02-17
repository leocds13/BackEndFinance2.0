import { randomUUID } from "crypto";

export class Category {
	public readonly user_id: string;
	public readonly id: string;
	public name: string;
	public description: string | null;

	constructor(categ: Omit<Category, "id">, id?: string) {
		this.user_id = categ.user_id;
		this.name = categ.name;
		this.description = categ.description;

		if (id) {
			this.id = id;
		} else {
			this.id = randomUUID();
		}
	}
}
