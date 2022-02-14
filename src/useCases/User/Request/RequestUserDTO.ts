import { Schema } from "express-validator";

export const RequestValidationSchema: Schema = {
	id: {
		optional: true,
		in: "body",
		isEmpty: {
			negated: true,
			options: { ignore_whitespace: true },
			errorMessage: "Id canot be blank!",
			bail: true,
		},
		isUUID: {
			errorMessage: "Invalid id!",
			bail: true,
		},
	},
	email: {
		optional: true,
		in: "body",
		isEmpty: {
			negated: true,
			options: { ignore_whitespace: true },
			errorMessage: "Email canot be blank!",
			bail: true,
		},
		isEmail: {
			errorMessage: "Invalid email!",
			bail: true,
		},
	},
	all: {
		optional: true,
		in: "body",
		isEmpty: {
			negated: true,
			options: { ignore_whitespace: true },
			errorMessage: "All canot be blank!",
			bail: true,
		},
		isBoolean: {
			errorMessage: "Invalid email!",
			bail: true,
		},
	},
};

export interface IRequestUserRequestDTO {
	type: string,
	value: string | boolean,
	user_id: string
}
