import { config } from 'dotenv';

config();

import { App } from "./app";

const app = new App();

const server = app.start(3000, () => {
	console.log("Server rodando no porta 3000");
});

export { server };
