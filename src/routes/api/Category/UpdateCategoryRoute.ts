import { NextFunction, Request, Response } from "express";
import { updateCategoryController } from "../../../useCases/Category/Update";

export function UpdateCategoryRoute() {
	return async (req: Request, res: Response, next: NextFunction) =>
		updateCategoryController.handle(req, res, next);
}
