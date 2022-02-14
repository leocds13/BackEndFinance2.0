import { Schema } from "express-validator";

export const CreateUserValidationSchema: Schema = {
	name: {
		in: "body",
		exists: {
			options: {
				checkFalsy: true,
				checkNull: true
			},
			errorMessage: "Name is required!",
			bail: true
		},
		isEmpty: {
			negated: true,
			options: {
				ignore_whitespace: true,
			},
			errorMessage: "Name canot be empty!",
			bail: true
		},
		isAlpha: {
			errorMessage: "Name invalid!",
			bail: true
		},
		isLength: {
			options: {
				min: 3,
			},
			errorMessage: "Name too short!",
			bail: true
		},
	},
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
		isEmpty: {
			negated: true,
			options: {
				ignore_whitespace: true,
			},
			errorMessage: "Password canot be empty!",
			bail: true,
		},
		isLength: {
			options: {
				min: 8,
			},
			errorMessage: "Password needs at least 8 charactes",
		},
		matches: {
			options:
				/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z])/,
			errorMessage:
				"Password needs: \n 1 Upper character \n 1 Especial simbol \n 2 Numbers \n 2 Normal case characters",
		},
	},
};

export interface ICreateUserRequestDTO {
	name: string;
	email: string;
	password: string;
}