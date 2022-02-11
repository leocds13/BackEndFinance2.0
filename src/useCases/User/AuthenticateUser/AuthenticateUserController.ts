import { NextFunction, Request, Response } from "express";
import { validate } from "../../../midleware/validate";
import { AuthenticateUserValidationSchema } from "./AuthenticateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
	constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			await validate(req, AuthenticateUserValidationSchema);

			const { authCode } = req.params;

			await this.authenticateUserUseCase.execute(authCode);

			return res.status(200).json('Authenticação realizada com sucesso, você já pode fazer login agora!');
		} catch (e) {
			next(e);
		}
	}
}
