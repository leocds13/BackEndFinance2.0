import { NextFunction, Request, Response } from "express";
import { authenticatorController } from "../midleware/authenticator";

export function AuthenticatorMiddleware() {
	return async (req: Request, res: Response, next: NextFunction) =>
		authenticatorController.handle(req, res, next);
}
