import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { validate } from "../../../midleware/validate";
import { IController } from "../../../types";
import { AuthenticateUserValidationSchema } from "./AuthenticateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController implements IController {
	constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			await validate(req, checkSchema(AuthenticateUserValidationSchema).run);

			const { authCode } = req.params;

			await this.authenticateUserUseCase.execute(authCode);

			return res.status(200).json('Authenticação realizada com sucesso, você já pode fazer login agora!');
		} catch (e) {
			next(e);
		}
	}
}
