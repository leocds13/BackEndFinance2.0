import { Request } from "express";
import { ValidationError, validationResult } from "express-validator";
import { ErrorExeption, ValidationExeption } from "../entities/ErrorExeption";

export async function validate(
	req: Request,
	validationRunFunc: (req: Request) => Promise<any>
) {
	await validationRunFunc(req);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array()[0])
		throw new ErrorExeption({
			status: 400,
			err: errors.array().reduce<ValidationExeption[]>((prev, val) => {
				if (!val.nestedErrors) {
					return [...prev, new ValidationExeption(val.param, val.msg)];
				} else {
					const err = val.nestedErrors.map((nestedVal) => {
						return new ValidationExeption((<ValidationError>nestedVal).location+'.'+(<ValidationError>nestedVal).param, (<ValidationError>nestedVal).msg)
					})

					return [...prev, ...err]
				}
			}, []),
		});
	}
}