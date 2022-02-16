import { NextFunction, Request, Response } from "express";
import { createCategoryController } from "../../../useCases/Category/Create";

export function CreateCategoryRoute() {
	return async (req: Request, res: Response, next: NextFunction) => createCategoryController.handle(req, res, next);
}
