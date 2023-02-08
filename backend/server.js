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

// test path to check that the server is running
server.get("/api", (req, res) => {
	if (true) {
		throw new Error("GET requests to /api currently blocked to test error handling");
	}
	console.log("GET on /api");
	res.json({message: "this is the response to a GET request on /api"});
})
server.post("/api", (req, res) => {
	console.log("POST on /api");
	const {body} =  req;
	console.log({body});
	res.json({message: "this is the response to a POST request on /api"});
});

// routes (to be added)

// error handling
server.use(errorMiddleware);

// listen to port
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});