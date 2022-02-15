import { Schema } from "express-validator";
import { User } from "../../../entities/User";

export const UpdateUserValidationSchema: Schema = {
	name: {
		in: "body",
		optional: true,
		isEmpty: {
			negated: true,
			options: {
				ignore_whitespace: true,
			},
			errorMessage: "Name canot be empty!",
			bail: true,
		},
		isAlpha: {
			errorMessage: "Name invalid!",
			bail: true,
		},
		isLength: {
			options: {
				min: 3,
			},
			errorMessage: "Name too short!",
			bail: true,
		},
	},
	email: {
		in: "body",
		optional: true,
		isEmpty: {
			negated: true,
			options: {
				ignore_whitespace: true,
			},
			errorMessage: "Email canot be empty!",
			bail: true,
		},
		isEmail: {
			errorMessage: "Email invalid!",
			bail: true,
		},
	},
	password: {
		in: "body",
		optional: true,
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
	_: {
		custom: {
			options: (_, { req: { body } }) => {
				if (Object.keys(body).length === 0) {
					return Promise.reject("Inform at least 1 property");
				}
                return Promise.resolve()
			}
		},
	},
};

export interface IUpdateUserRequestDTO extends Omit<Partial<User>, "id"> {
    id: string
}
