import { NextFunction, Request, Response } from "express";
import { deleteUserController } from "../../useCases/User/Delete";

export function DeleteUserRoute() {
	return async (req: Request, res: Response, next: NextFunction) => deleteUserController.handle(req, res, next);
}
