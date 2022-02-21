import { Request, Response, NextFunction } from "express";
import { ErrorExeption } from "../../entities/ErrorExeption";
import { ErrorHandlerUseCase } from "./ErrorHandlerUseCase";

export class ErrorHandlerController {
	constructor(public errorExeptionUseCase: ErrorHandlerUseCase) {}

	async handle(
		err: ErrorExeption,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> {
		const status = err.status || 500;
		const msg = err.err || "Something went wrong, sorry!";

		if (status === 500) {
			this.errorExeptionUseCase.execute(err);
		}

		return res.status(status).json({
			status,
			msg,
		});
	}
}
