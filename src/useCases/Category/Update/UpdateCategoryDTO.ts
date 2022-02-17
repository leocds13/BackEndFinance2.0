import { Schema } from "express-validator";
import { User } from "../../../entities/User";

export const UpdateCategoryValidationSchema: Schema = {
	id: {
		in: "params",
		exists: {
			options: {
				checkFalsy: true,
				checkNull: true,
			},
			errorMessage: "Id is required!",
			bail: true,
		},
		isEmpty: {
			options: { ignore_whitespace: true },
			negated: true,
			errorMessage: "Id canot be blank!",
			bail: true,
		},
		isUUID: {
			errorMessage: "Invalid id!",
			bail: true,
		},
	},
	name: {
		in: "body",
		optional: true,
		isString: {
			errorMessage: "Invalid name!",
			bail: true,
		},
		isEmpty: {
			options: { ignore_whitespace: true },
			negated: true,
			errorMessage: "Name canot be blank!",
			bail: true,
		},
	},
	description: {
		in: "body",
		optional: true,
		isString: {
			errorMessage: "Invalid description!",
			bail: true,
		},
	},
	_: {
		custom: {
			options: (_, { req: { body } }) => {
				if (Object.keys(body).length === 0) {
					return Promise.reject("Inform at least 1 property!");
				}
				return Promise.resolve();
			},
		},
	},
};

export interface IUpdateCategoryRequestDTO {
	user: User;
	categ_id: string;
	payload: {
		name?: string;
		description?: string;
	};
}
