import { Router } from "express";
import { AuthenticatorMiddleware } from "../AuthenticatorMiddleware";
import { AuthenticateUserRoute } from "./AuthenticateUserRoute";
import { CreateUserRoute } from "./CreateUserRoute";
import { LoginUserRoute } from "./LoginUserRoute";
import { LogoutUserRoute } from "./LogoutUserRoute";
import { RequestUserRoute } from "./RequestUserRoute";
import { UpdateUserRoute } from "./UpdateUserRoute";

const userRouter = Router();

// CRUD
userRouter.post("/", CreateUserRoute());
userRouter.get("/", AuthenticatorMiddleware(), RequestUserRoute());
userRouter.put("/", AuthenticatorMiddleware(), UpdateUserRoute());

// Tokenizing
userRouter.post("/login", LoginUserRoute());
userRouter.get("/logout", AuthenticatorMiddleware(), LogoutUserRoute());

// Authentication
userRouter.get("/authenticate/:authCode", AuthenticateUserRoute());

export { userRouter };
