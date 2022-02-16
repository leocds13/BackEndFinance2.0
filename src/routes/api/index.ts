import { Router } from "express";
import { categoryRouter } from "./Category";

const apiRouter = Router();

apiRouter.use("/categories", categoryRouter);

export { apiRouter };
