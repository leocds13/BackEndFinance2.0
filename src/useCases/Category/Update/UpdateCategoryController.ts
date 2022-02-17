import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import {
	ErrorExeption,
	ValidationExeption,
} from "../../../entities/ErrorExeption";
import { validate } from "../../../midleware/validate";
import { IController } from "../../IController";
import { UpdateUserValidationSchema } from "../../User/Update/UpdateUserDTO";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

export class UpdateCategoryController implements IController {
	constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const validation = checkSchema(UpdateUserValidationSchema);

			await validate(req, validation.run);

			const { id } = req.params;
			const { name, description } = req.body;
			
			if (name === undefined && description === undefined) {
				throw new ErrorExeption({
					status: 400,
					err: [
						new ValidationExeption(
							"body",
							"Informed at least one of name or description properties!"
						),
					],
				});
			}

			await this.updateCategoryUseCase.execute({
				user: res.locals.user,
				categ_id: id,
				payload: {
					name,
					description
				}
			})

			res.status(200).send();
		} catch (e) {
			next(e);
		}
	}
}
