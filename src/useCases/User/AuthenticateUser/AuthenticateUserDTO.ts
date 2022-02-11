import { Schema } from "express-validator";

export const AuthenticateUserValidationSchema: Schema = {
    authCode: {
        in: 'params',
        isString: {
            errorMessage: 'Invalid authCode!',
            bail: true
        },
        isUUID: {
            errorMessage: 'Invalid authCode not a UUID!'
        }
    }
}
