import { NextFunction, Request, Response } from "express";
import { createUserController } from "../../useCases/User/Create";

export function CreateUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => createUserController.handle(req, res, next);
}
