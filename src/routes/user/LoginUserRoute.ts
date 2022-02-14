import { NextFunction, Request, Response } from "express";
import { loginUserController } from "../../useCases/User/Login";

export function LoginUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => loginUserController.handle(req, res, next);
}
