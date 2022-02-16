import { Router } from "express";
import { CreateCategoryRoute } from "./CreateCategoryRoute";
import { RequestCategoryRoute } from "./RequestCategoryRoute";

const categoryRouter = Router()

// CRUD
categoryRouter.post('/', CreateCategoryRoute());
categoryRouter.get('/', RequestCategoryRoute());

export {categoryRouter}