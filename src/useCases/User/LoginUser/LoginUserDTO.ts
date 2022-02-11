import { Schema } from "express-validator";

export const LoginUserValidationSchema: Schema = {
    email: {
		in: "body",
		exists: {
			options: {
				checkFalsy: true,
				checkNull: true,
			},
			errorMessage: "Email is required!",
			bail: true
		},
		isEmpty: {
			negated: true,
			options: {
				ignore_whitespace: true,
			},
			errorMessage: "Email canot be empty!",
			bail: true
		},
		isEmail: {
			errorMessage: "Email invalid!",
			bail: true
		},
	},
	password: {
		in: "body",
		exists: {
			options: {
				checkFalsy: true,
				checkNull: true,
			},
			errorMessage: "Password is required!",
			bail: true,
		},
	},
}

export interface ILoginUserRequestDTO {
    email: string;
    password: string;
}
