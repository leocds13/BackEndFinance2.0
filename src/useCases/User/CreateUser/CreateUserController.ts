import { NextFunction, Request, Response } from "express";
import { validate } from "../../../midleware/validate";
import { IController } from "../../IController";
import { CreateUserValidationSchema } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController implements IController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await validate(req, CreateUserValidationSchema);

			const { name, email, password } = req.body;

			await this.createUserUseCase.execute({
				name,
				email,
				password,
			});

			res.status(201).send();
		} catch (e) {
			next(e);
		}
	}
}
