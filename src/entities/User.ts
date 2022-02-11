import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";

export class User {
	public readonly id: string;

	public name: string;
	public email: string;
	public password: string;
	public authenticated?: boolean;

	constructor(props: Omit<User, "id">, id?: string) {
        this.name = props.name;
		this.email = props.email;
		this.authenticated = props.authenticated || false
		
		if (id) {
			this.id = id;
			this.password = props.password;
		} else {
			this.id = randomUUID();
			this.password = bcrypt.hashSync(props.password, 8);
		}
	}
}
