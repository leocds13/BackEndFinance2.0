import { ITokenProvider } from "../ITokenProvider";
import jwt from "jsonwebtoken";
import { ErrorExeption } from "../../../entities/ErrorExeption";

export class JsonwebtokenProvider implements ITokenProvider {
	async assing(id: string): Promise<string> {
		const token = jwt.sign({ id }, process.env.JWT_SECRET || "", {
			expiresIn: process.env.JWT_EXPIRESIN || '1d',
		});

		return token;
	}

	async verify(token: string): Promise<string | void> {
		try {
			const payload = jwt.verify(
				token,
				process.env.JWT_SECRET || ""
			);

			return (<{ id: string }>payload).id;
		} catch (e) {}
	}
}
