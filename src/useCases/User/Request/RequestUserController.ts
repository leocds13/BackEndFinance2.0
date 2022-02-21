import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { validate } from "../../../midleware/validate";
import { IController } from "../../../types";
import { RequestValidationSchema } from "./RequestUserDTO";
import { RequestUserUseCase } from "./RequestUserUseCase";

export class RequestUserController implements IController {
	constructor(private requestUserUseCase: RequestUserUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const validation = checkSchema(RequestValidationSchema);

			await validate(req, validation.run);

			const { id, email, all } = req.body;

			const value: string | boolean = id || email || all;
			const field = Object.keys(req.body)[0];

			const user_id = res.locals.user.id;

			const users = await this.requestUserUseCase.execute({
				type: field,
				value,
				user_id,
			});

			res.status(201).json(users);
		} catch (e) {
			next(e);
		}
	}
}
