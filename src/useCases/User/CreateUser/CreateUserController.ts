import { NextFunction, Request, Response } from "express";
import { validate } from "../../../midleware/validate";
import { CreateUserValidationSchema } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async handle(req: Request, res: Response, next: NextFunction) {
		try {
			await validate(req, CreateUserValidationSchema);

			const { name, email, password } = req.body;

			await this.createUserUseCase.execute({
				name,
				email,
				password,
			});

			return res.status(201).send();
		} catch (e) {
			next(e);
		}
	}
}
