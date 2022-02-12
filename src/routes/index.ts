import { Router } from "express";
import { apiRouter } from "./api";
import { AuthenticatorMiddleware } from "./AuthenticatorMiddleware";
import { userRouter } from "./user";

const rootRouter = Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/api", AuthenticatorMiddleware(), apiRouter);

export { rootRouter };
