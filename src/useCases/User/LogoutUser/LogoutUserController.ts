import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { IController } from "../../IController";
import { ILogoutUserRequestDTO } from "./LogoutUserDTO";
import { validate } from "../../../midleware/validate";
import { LogoutUserUseCase } from "./LogoutUserUseCase";
import { cookie} from "express-validator";

export class LogoutUserController implements IController {
	constructor(private logoutUserUseCase: LogoutUserUseCase) {}

	async handle(
		req: Request<ParamsDictionary, any, ILogoutUserRequestDTO>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const validation = cookie("token")
				.exists({ checkFalsy: true, checkNull: true })
				.withMessage("cookie.token is required")
				.bail()
				.not()
				.isEmpty({ ignore_whitespace: true })
				.withMessage("cookie.token canot be Blank!")
				.bail();

			await validate(req, validation.run);

			const token = req.cookies.token || req.headers.authorization;
			
			await this.logoutUserUseCase.execute({
				token,
			});

			res.status(200).send();
		} catch (e) {
			next(e);
		}
	}
}
