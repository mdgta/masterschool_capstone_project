import mongoose from "mongoose";

const connectDB = async () => {
	const {MONGO_URI} = process.env;
	try {
		console.log("MongoDB: connecting...");
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB: connected!");
	} catch (err) {
		console.log("MongoDB: unable to connect");
		process.exit(1);
	}
}

export default connectDB;