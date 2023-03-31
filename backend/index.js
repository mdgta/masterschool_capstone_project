import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import {applyServerUse} from "./config/applyServerUse.js";

// access environmental variables
dotenv.config();

// start server
const server = express();

// connect to database
connectDB();

// implement request body, routes, and error handlers
applyServerUse(server);

// listen to port
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});