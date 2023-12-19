import express from "express";
import "express-async-errors";
import Routes from "./startup/routes.js";
import connectToDB from "./startup/db.js";
import configureApp from "./startup/config.js";
import { handleExceptions } from "./middleware/logger.js";

const app = express();
Routes(app);
connectToDB();
configureApp();
handleExceptions();

//Port, (Environment Variable )
//$env:PORT=5000 in terminal, or set PORT=5000 in cmd
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
