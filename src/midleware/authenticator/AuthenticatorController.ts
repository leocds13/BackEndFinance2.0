import { NextFunction, Request, Response } from "express";
import { cookie } from "express-validator";
import { IController } from "../../useCases/IController";
import { validate } from "../validate";
import { AuthenticatorUseCase } from "./AuthenticatorUseCase";

export class AuthenticatorController implements IController {
	constructor(private authenticatorUseCase: AuthenticatorUseCase) {}

	async handle(req: Request, res: Response, next: NextFunction) {
		try {
			const validation = cookie("token")
				.exists({ checkFalsy: true, checkNull: true })
				.withMessage("cookie.Token is required")
				.bail()
				.not()
				.isEmpty({ ignore_whitespace: true })
				.withMessage("cookie.Token canot be Blank!")
				.bail();

			await validate(req, validation.run);

			const { token } = req.cookies;

			const user = await this.authenticatorUseCase.execute(token)

			res.locals.user = user

			next();
		} catch (e) {
			next(e);
		}
	}
}
