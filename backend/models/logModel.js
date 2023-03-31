import {Schema, model} from "mongoose";
import {symptomEntrySchema} from "./symptomModel.js";

// schema for describing symptoms with scaling
// (used as subdocument in logShcema)
const scaledSymptomSchema = new Schema({
	// described symptom
	symptom: {
		type: symptomEntrySchema,
		required: [true, "scaledSymptom requires valid symptom"]
	},
	// symptom intensity
	intensity: {
		type: Number,
		enum: [1, 2, 3],
		required: [true, "scaledSymptom requires valid intensity"]
	},
}, {
	timestamps: true
});

// schema for describing daily log
const logSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: [true, "user field missing"]
	},
	date: {
		type: String,
		required: [true, "name field missing"],
		match: /^20\d{2}\-(:?0[1-9]|1[0-2])\-([0-2][0-9]|3[01])$/
	},
	symptoms: {
		type: [scaledSymptomSchema],
		required: [true, "symptoms field missing"]
	},
	description: String
}, {
	timestamps: true
});

export default model("Log", logSchema);