import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// access environmental variables
dotenv.config();

// start server
const server = express();

// connect to database
connectDB();

// allow accepting cross-origin data and accessing request body
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({
	extended: false
}));

// routes
server.use("/api/auth", userRoutes);
server.use("/api/logs", logsRoutes);

// error handling
server.use(errorMiddleware);

// listen to port
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});