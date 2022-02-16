import { Router } from "express";
import { CreateCategoryRoute } from "./CreateCategoryRoute";

const categoryRouter = Router()

categoryRouter.post('/', CreateCategoryRoute());

export {categoryRouter}