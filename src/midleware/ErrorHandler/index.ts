import { ErrorHandlerController } from "./ErrorHandlerController";
import { ErrorHandlerUseCase } from "./ErrorHandlerUseCase";

const errorHandlerUseCase = new ErrorHandlerUseCase();

const errorHandlerController = new ErrorHandlerController(errorHandlerUseCase);

export { errorHandlerUseCase, errorHandlerController };
