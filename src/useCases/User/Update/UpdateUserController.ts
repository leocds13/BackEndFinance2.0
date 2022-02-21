import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import {
	ErrorExeption,
	ValidationExeption,
} from "../../../entities/ErrorExeption";
import { validate } from "../../../midleware/validate";
import { IController } from "../../../types";
import { UpdateUserValidationSchema } from "./UpdateUserDTO";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController implements IController {
	constructor(private updateUserUseCase: UpdateUserUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const validation = checkSchema(UpdateUserValidationSchema);

			await validate(req, validation.run);

			const { name, email, password } = req.body;

			if (!(name || email || password)) {
				throw new ErrorExeption({
					status: 400,
					err: [
						new ValidationExeption(
							"body",
							"Informed at least one of name, email or password properties!"
						),
					],
				});
			}

			await this.updateUserUseCase.execute({
				email,
				name,
				password,
				params_id: req.params.id,
				user_id: res.locals.user.id,
			});

			res.status(201).send();
		} catch (e) {
			next(e);
		}
	}
}
