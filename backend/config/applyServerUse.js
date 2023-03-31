import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes.js";
import logsRoutes from "../routes/logsRoutes.js";
import symptomRoutes from "../routes/symptomRoutes.js";
import errorMiddleware from "../middleware/errorMiddleware.js";

export const applyServerUse = server => {
	// allow accepting cross-origin data and accessing request body
	server.use(cors());
	server.use(express.json());
	server.use(express.urlencoded({
		extended: false
	}));

	// routes
	server.use("/api/auth", userRoutes);
	server.use("/api/logs", logsRoutes);
	server.use("/api/symptoms", symptomRoutes);

	// error handling
	server.use(errorMiddleware);
}