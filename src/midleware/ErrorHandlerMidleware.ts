import { NextFunction, Request, Response } from "express";
import { errorHandlerController } from "./ErrorHandler";

export function errorHandlerMidleware() {
    return (err: any, req: Request, res: Response, next: NextFunction) => errorHandlerController.handle(err, req, res, next)
}