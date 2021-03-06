import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { IController } from "../../../types";
import { ILogoutUserRequestDTO } from "./LogoutUserDTO";
import { LogoutUserUseCase } from "./LogoutUserUseCase";

export class LogoutUserController implements IController {
	constructor(private logoutUserUseCase: LogoutUserUseCase) {}

	async handle(
		req: Request<ParamsDictionary, any, ILogoutUserRequestDTO>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const token = req.cookies.token;
			
			await this.logoutUserUseCase.execute({
				token,
			});

			res.status(200).send();
		} catch (e) {
			next(e);
		}
	}
}
