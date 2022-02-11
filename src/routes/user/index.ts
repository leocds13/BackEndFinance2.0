import { Router } from "express";
import { AuthenticateUserRoute } from "./AuthenticateUserRoute";
import { CreateUserRoute } from "./CreateUserRoute";

const userRouter = Router();

userRouter.post("/", CreateUserRoute());
userRouter.get("/authenticate/:authCode", AuthenticateUserRoute());

export { userRouter };
