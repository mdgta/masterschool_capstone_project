import asyncHandler from "express-async-handler";
import {str} from "../util/strings.js";
import defaultSymptoms from "../data/symptoms.json" assert {type: "json"};

// (for each controller, only return the actual symptoms array, not the entire surrounding object)

const safeProps = ["name", "color"];

const sanitizeSymptomsArray = (symptoms) => {
	const asObj = symptoms.toObject();
	asObj.forEach(symptom => {
		for (const prop in symptom) {
			if (!safeProps.includes(prop)) {
				delete symptom[prop];
			}
		}
	});
	return asObj;
}

// get symptoms
export const getSymptoms = asyncHandler(async (req, res) => {
	const {symptoms} = req;
	res.json(sanitizeSymptomsArray(symptoms.symptoms));
});

// update symtpoms
export const updateSymptoms = asyncHandler(async (req, res) => {
	const {symptoms} = req;
	const newSymptoms = req.body;
	console.log({newSymptoms});
	// ensure that the request body is an array
	if (!(newSymptoms instanceof Array)) {
		throw new Error(str("symptoms.updateNoSymptomsProvided"));
	}
	symptoms.symptoms = newSymptoms;
	try {
		await symptoms.save();
	} catch (err) {
		throw new Error(str("symptoms.updateInvalidStructure"));
	}
	res.json(sanitizeSymptomsArray(symptoms.symptoms));
});

export const resetToDefaultSymptoms = asyncHandler(async (req, res) => {
	const {symptoms} = req;
	symptoms.symptoms = defaultSymptoms;
	await symptoms.save();
	res.json(sanitizeSymptomsArray(symptoms.symptoms));
});