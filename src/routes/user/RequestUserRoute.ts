import { NextFunction, Request, Response } from "express";
import { requestUserController } from "../../useCases/User/Request";

export function RequestUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => requestUserController.handle(req, res, next);
}
