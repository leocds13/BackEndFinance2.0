import { Schema } from "express-validator";

export const RequestCategoryValidationSchema: Schema = {
	name: {
		in: "query",
		optional: true,
		isEmpty: {
			options: {
				ignore_whitespace: true,
			},
			negated: true,
			errorMessage: "Name canot be blank!",
			bail: true,
		},
		isString: {
			errorMessage: "Invalid name!",
			bail: true,
		},
	},
	description: {
		in: "query",
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
			bail: true,
		},
	},
};

export interface IRequestCategoryRequestDTO {
	user_id: string;
	name?: string;
	description?: string;
}
