import { NextFunction, Request, Response } from "express";
import { authenticateUserController } from "../../useCases/User/AuthenticateUser";

export function AuthenticateUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => authenticateUserController.handle(req, res, next);
}
