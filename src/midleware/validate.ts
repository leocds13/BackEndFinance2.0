import { Request } from "express";
import { validationResult } from "express-validator";
import { ErrorExeption, ValidationExeption } from "../entities/ErrorExeption";

export async function validate(
	req: Request,
	validationRunFunc: (req: Request) => Promise<any>
) {
	await validationRunFunc(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new ErrorExeption({
			status: 400,
			err: errors.array().map((val) => {
				return new ValidationExeption(val.param, val.msg);
			}),
		});
	}
}