import { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import { validate } from "../../../midleware/validate";
import { IController } from "../../../types";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController implements IController {
	constructor(private deleteUserUseCase: DeleteUserUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const validation = param("id")
				.exists()
				.withMessage("Id is required!")
				.bail()
				.isUUID()
				.withMessage("Invalid id!");

			await validate(req, validation.run);

			const params_id = req.params.id;
			const user_id = res.locals.user.id;

			await this.deleteUserUseCase.execute({
				params_id,
				user_id,
			});

			res.status(200).send();
		} catch (e) {
			next(e);
		}
	}
}
