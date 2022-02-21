import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import { User } from "../../../entities/User";
import { validate } from "../../../midleware/validate";
import { IController } from "../../../types";
import { RequestCategoryValidationSchema } from "./RequestCategoryDTO";
import { RequestCategoryUseCase } from "./RequestCategoryUseCase";

export class RequestCategoryController implements IController {
	constructor(private requestCategoryUseCase: RequestCategoryUseCase) {}

	async handle(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
            const validation = checkSchema(RequestCategoryValidationSchema)

            await validate(req, validation.run)

			const user: User = res.locals.user;
			const { name, description } = req.query;
			const {id} = req.params;

			const categs = await this.requestCategoryUseCase.execute({ 
                user_id: user.id,
				categ_id: id,
				data: {
					name: (<string>name),
					description: (<string>description),
				}
            });

			res.status(200).json(categs);
		} catch (e) {
			next(e);
		}
	}
}
