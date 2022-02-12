import { Router } from "express";
import { AuthenticatorMiddleware } from "../AuthenticatorMiddleware";
import { AuthenticateUserRoute } from "./AuthenticateUserRoute";
import { CreateUserRoute } from "./CreateUserRoute";
import { LoginUserRoute } from "./LoginUserRoute";
import { LogoutUserRoute } from "./LogoutUserRoute";

const userRouter = Router();

// CRUD
userRouter.post("/", CreateUserRoute());

// Tokenizing
userRouter.post("/login", LoginUserRoute());
userRouter.get("/logout", AuthenticatorMiddleware(), LogoutUserRoute());

// Authentication
userRouter.get("/authenticate/:authCode", AuthenticateUserRoute());

export { userRouter };
