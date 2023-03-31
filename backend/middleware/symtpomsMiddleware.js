import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Symptom from "../models/symptomModel.js";
import defaultSymptoms from "../data/symptoms.json" assert {type: "json"};

// create a symptoms entry for the user, in case one doesn't exist
const createFirstTimeEntry = async (user) => {
	const entry = await Symptom.create({
		user: user.id,
		symptoms: defaultSymptoms
	});
	return entry;
}

// actual middleware (query user's symptoms/create if necessary, and add to req object);
export const symtpomsMiddleware = asyncHandler(async (req, res, next) => {
	const {user} = req;
	// define output
	const entry = await Symptom.findOne({
		user: user.id
	}) || await createFirstTimeEntry(user);
	req.symptoms = entry;
	// continue
	next();
});