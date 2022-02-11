import { NextFunction, Request, Response } from "express";
import { loginUserController } from "../../useCases/User/LoginUser";

export function LoginUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => loginUserController.handle(req, res, next);
}
