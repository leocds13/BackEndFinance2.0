import { NextFunction, Request, Response } from "express";
import { ErrorExeption } from "../../entities/ErrorExeption";

export class ErrorHandlerController {
	async handle(
		error: ErrorExeption,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> {
		const status = error.status || 500;
		const err = error.err || "Ocorreu um erro interno!";

		if (status === 500) {
			console.log(error);
		}

		return res.status(status).json({
			status,
			err,
		});
	}
}
