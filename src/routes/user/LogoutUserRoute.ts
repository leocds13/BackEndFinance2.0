import { NextFunction, Request, Response } from "express";
import { logoutUserController } from "../../useCases/User/LogoutUser";

export function LogoutUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => logoutUserController.handle(req, res, next);
}
