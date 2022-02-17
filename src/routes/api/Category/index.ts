import { Router } from "express";
import { CreateCategoryRoute } from "./CreateCategoryRoute";
import { RequestCategoryRoute } from "./RequestCategoryRoute";
import { UpdateCategoryRoute } from "./UpdateCategoryRoute";

const categoryRouter = Router()

// CRUD
categoryRouter.post('/', CreateCategoryRoute());
categoryRouter.get('/', RequestCategoryRoute());
categoryRouter.get('/:id', RequestCategoryRoute());
categoryRouter.put('/', UpdateCategoryRoute());
categoryRouter.put('/:id', UpdateCategoryRoute());

export {categoryRouter}