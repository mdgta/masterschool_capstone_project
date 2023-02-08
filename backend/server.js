import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js";

// access environmental variables
dotenv.config();

// start server
const server = express();

// allow accepting cross-origin data and accessing request body
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({
	extended: false
}));

// routes (to be added)

// error handling
server.use(errorMiddleware);

// listen to port
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});