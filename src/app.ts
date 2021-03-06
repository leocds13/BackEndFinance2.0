import express, { Application } from "express";
import helmet from "helmet";
import { Server } from "http";
import { rootRouter } from "./routes";
import cookieParser from 'cookie-parser';
import { errorHandlerMidleware } from "./midleware/ErrorHandlerMidleware";

export class App {
	private app: Application;

	constructor() {
		this.app = express();
		this.config();
	}

	private config() {
		// MidleWares
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(cookieParser());
		
		// Routes
		this.app.use(rootRouter);

		// MidleWare Erro Handler
		this.app.use(errorHandlerMidleware());
	}

	public async start(port: number, callback: () => void): Promise<Server> {
		return this.app.listen(port, callback);
	}
}
