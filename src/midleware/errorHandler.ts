import { ErrorHandlerController } from "./ErroHandler/ErrorHandlerController";

function errorHandler() {
	// implementar funcionalidade de errorHandler

	const errorHandlerController = new ErrorHandlerController();

	return errorHandlerController.handle;
}

export { errorHandler };
