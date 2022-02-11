import { NextFunction, Request, Response } from "express";

function authenticator() {
	// Implementar funcionalidade de autenticação
	return (req: Request, res: Response, next: NextFunction) => {
		next();
	};
}

export { authenticator };
