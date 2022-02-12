import { Router } from "express";
import { authenticatorController } from "../midleware/authenticator";
import { apiRouter } from "./api";
import { userRouter } from "./user";

const rootRouter = Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/api", (req, res, next) => authenticatorController.handle(req, res, next), apiRouter);

export { rootRouter };
