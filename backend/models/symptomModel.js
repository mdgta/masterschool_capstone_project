import {Schema, model} from "mongoose";


// a single symptom schema (used both for the symptoms and logs collections)
export const symptomEntrySchema = new Schema({
	// symptom name
	name: {
		type: String,
		required: [true, "symptomEntry requires name"]
	},
	// symptom intensity
	color: {
		type: String,
		match: /^[roygbv][1-5]$/,
		required: [true, "symptom requires valid color"]
	}
});

// schema for user-saved list of symptoms
const symptomSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: [true, "user field missing"]
	},
	symptoms: {
		type: [symptomEntrySchema],
		required: [true, "symptoms field missing"]
	}
}, {
	timestamps: true
});

export default model("Symptom", symptomSchema);