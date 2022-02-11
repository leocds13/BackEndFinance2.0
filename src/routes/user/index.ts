import { Router } from "express";
import { AuthenticateUserRoute } from "./AuthenticateUserRoute";
import { CreateUserRoute } from "./CreateUserRoute";
import { LoginUserRoute } from "./LoginUserRoute";

const userRouter = Router();

userRouter.post("/", CreateUserRoute());
userRouter.post("/login", LoginUserRoute());
userRouter.get("/authenticate/:authCode", AuthenticateUserRoute());

export { userRouter };
