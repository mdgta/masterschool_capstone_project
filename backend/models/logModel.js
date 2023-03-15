import {Schema, model} from "mongoose";

// schema for describing symptoms
// (used as subdocument in locShcema)
const symtpomSchema = new Schema({
	// symptom name
	name: {
		type: String,
		required: [true, "symtpom name missing"]
	},
	// symptom intensity
	intensity: {
		type: Number,
		enum: [0, 1, 2, 3, 4],
		required: [true, "symptom requires valid intensity"]
	}
}, {
	timestamps: true
});

// schema for describing daily log
const logSchema = new Schema({
	user: Schema.Types.ObjectId,
	date: {
		type: String,
		required: [true, "name field missing"],
		match: /^20\d{2}\-(:?0[1-9]|1[0-2])\-([0-2][0-9]|3[01])$/
	},
	symptoms: {
		type: [symtpomSchema],
		required: [true, "symptoms field missing"]
	},
	description: {
		type: String,
		required: [true, "description field missing"]
	}
}, {
	timestamps: true
});

export default model("Log", logSchema);