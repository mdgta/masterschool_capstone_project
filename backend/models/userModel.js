import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: "String",
		required: [true, "name field missing"]
	},
	email: {
		type: "String",
		required: [true, "email missing"]
	},
	password: {
		type: "String",
		required: [true, "password missing"]
	}
}, {
	timestamps: true
});

export default mongoose.model("User", userSchema);