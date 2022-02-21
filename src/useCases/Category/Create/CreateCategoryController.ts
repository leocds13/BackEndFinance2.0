import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import { validate } from "../../../midleware/validate";
import { IController } from "../../../types";
import { CreateCategoryValidationSchema } from "./CreateCategoryDTO";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController implements IController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const validation = checkSchema(CreateCategoryValidationSchema);

			await validate(req, validation.run);

			const { name, description } = req.body;

			await this.createCategoryUseCase.execute({
				categ: {
					name,
					description
				},
				user: res.locals.user
			})

			res.status(201).send();
		} catch (e) {
			next(e);
		}
	}
}
