import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { validate } from "../../../midleware/validate";
import { IController } from "../../IController";
import { CreateUserValidationSchema } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController implements IController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			await validate(req, checkSchema(CreateUserValidationSchema).run);

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
