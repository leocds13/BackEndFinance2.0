import { Router } from "express";
import { AuthenticatorMiddleware } from "../../midleware/AuthenticatorMiddleware";
import { AuthenticateUserRoute } from "./AuthenticateUserRoute";
import { CreateUserRoute } from "./CreateUserRoute";
import { DeleteUserRoute } from "./DeleteUserRoute";
import { LoginUserRoute } from "./LoginUserRoute";
import { LogoutUserRoute } from "./LogoutUserRoute";
import { RequestUserRoute } from "./RequestUserRoute";
import { UpdateUserRoute } from "./UpdateUserRoute";

const userRouter = Router();

// CRUD
userRouter.post("/", CreateUserRoute());

userRouter.get("/", AuthenticatorMiddleware(), RequestUserRoute());

userRouter.put("/", AuthenticatorMiddleware(), UpdateUserRoute()); // Error - just to send a right message
userRouter.put("/:id", AuthenticatorMiddleware(), UpdateUserRoute());

userRouter.delete("/", AuthenticatorMiddleware(), DeleteUserRoute()); // Error - just to send a right message
userRouter.delete("/:id", AuthenticatorMiddleware(), DeleteUserRoute());

// Tokenizing
userRouter.post("/login", LoginUserRoute());
userRouter.get("/logout", AuthenticatorMiddleware(), LogoutUserRoute());

// Authentication
userRouter.get("/authenticate/:authCode", AuthenticateUserRoute());

export { userRouter };
