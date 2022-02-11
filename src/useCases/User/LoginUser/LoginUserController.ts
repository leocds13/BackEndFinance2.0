import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { IController } from "../../IController";
import {
	ILoginUserRequestDTO,
	LoginUserValidationSchema,
} from "./LoginUserDTO";
import { validate } from "../../../midleware/validate";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController implements IController {
    constructor(private loginUserUseCase: LoginUserUseCase) {}

	async handle(
		req: Request<ParamsDictionary, any, ILoginUserRequestDTO>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			await validate(req, LoginUserValidationSchema);

            const { email, password } = req.body;

            const token = await this.loginUserUseCase.execute({
                email,
                password
            })

			res.status(200).json({
				token,
			});
		} catch (e) {
			next(e);
		}
	}
}
