import { Request } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";
import { ErrorExeption, ValidationExeption } from "../entities/ErrorExeption";

export async function validate(req: Request, schema: Schema) {
	await checkSchema(schema).run(req);

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
