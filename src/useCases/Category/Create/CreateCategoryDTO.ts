import { Schema } from "express-validator";
import { User } from "../../../entities/User";

export const CreateCategoryValidationSchema: Schema = {
	name: {
		in: "body",
		exists: {
			options: {
				checkFalsy: true,
				checkNull: true,
			},
			errorMessage: "Name is required!",
			bail: true,
		},
		isString: {
			errorMessage: "Invalid name!",
			bail: true,
		},
		isEmpty: {
			negated: true,
			options: {
				ignore_whitespace: true,
			},
			errorMessage: "Name canot be blank!",
		},
	},
	description: {
		in: "body",
		optional: true,
		isString: {
			errorMessage: "Invalid description!",
			bail: true,
		},
		isEmpty: {
			negated: true,
			options: {
				ignore_whitespace: true,
			},
			errorMessage: "Description canot be blank!",
		},
	},
};

export interface ICreateCategoryRequestDTO {
	user: User;
	categ: {
		name: string;
		description: string;
	};
}
