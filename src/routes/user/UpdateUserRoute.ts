import { NextFunction, Request, Response } from "express";
import { updateUserController } from "../../useCases/User/Update";

export function UpdateUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => updateUserController.handle(req, res, next);
}
