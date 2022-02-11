import { Router } from "express";
import { userRouter } from "./user";

const rootRouter = Router();

rootRouter.use("/users", userRouter);

export { rootRouter };
