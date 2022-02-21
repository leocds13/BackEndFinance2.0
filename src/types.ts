import { NextFunction, Request, Response } from "express";

export interface IController {
	handle(req: Request, res: Response, next: NextFunction): Promise<unknown>;
}

export interface IUseCase {
	execute(data: unknown): Promise<unknown>;
}
