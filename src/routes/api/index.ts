import { Router } from "express";

const apiRouter = Router();

// CRUD
apiRouter.get("/", (req, res, next) => {
	console.log("Rota precisa ser authenticada!");
    console.log(`existir user`, res.locals)
	res.sendStatus(200);
});

export { apiRouter };
