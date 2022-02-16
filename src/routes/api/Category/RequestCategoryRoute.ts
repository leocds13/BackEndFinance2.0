import { NextFunction, Request, Response } from "express";
import { requestCategoryController } from "../../../useCases/Category/Request";

export function RequestCategoryRoute() {
	return async (req: Request, res: Response, next: NextFunction) => requestCategoryController.handle(req, res, next);
}
