import { ErrorExeption } from "../../entities/ErrorExeption";
import { IUseCase } from "../../types";

export class ErrorHandlerUseCase implements IUseCase {
	async execute(data: ErrorExeption): Promise<void> {
		// Gerenciar log (DB ou file) aqui.
		console.log(data);
	}
}
