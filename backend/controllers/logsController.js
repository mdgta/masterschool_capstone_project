import asyncHandler from "express-async-handler";
import Log from "../models/logModel.js";
import {str} from "../util/strings.js";

// export const day = asyncHandler(async (req, res, next) => {
// 	console.log("a");
// 	next();
// });

// export const month = asyncHandler(async (req, res, next) => {
// 	console.log("b");
// 	next();
// });

// export const year = asyncHandler(async (req, res, next) => {
// 	console.log("c");
// 	next();
// });

// export const logs = asyncHandler(async (req, res, next) => {
// 	console.log({"req.dateRange": req.dateRange});
// 	res.json({test: true})
// });

export const getLogs = asyncHandler(async (req, res) => {
	const {user} = req;
	const logs = await Log.find({
		user: user.id
	});
	res.json(logs);
});

export const postLog = asyncHandler(async (req, res) => {
	const {user, body} = req;
	const {date, description, symptoms} = body;
	// throw error if an entry for this date already exists
	const entryExists = await Log.findOne({
		user: user.id,
		date
	});
	if (entryExists) {
		res.status(400);
		throw new Error(str("logs.creationErrorDateExists"));
	}
	// create new entry and send back as json
	const log = await Log.create({
		user: user.id,
		date,
		symptoms,
		description
	});
	res.status(201).json(log);
});

export const updateLog = asyncHandler(async (req, res) => {
	const {user, body} = req;
	const {date, description, symptoms} = body;
	let notFound = false;
	// use a try block to allow checking both date-not-found and invalid-input-structure errors
	// if fail throw a custom error to the error handler
	try {
		// try to update
		const updated = await Log.findOneAndUpdate({
			user: user.id,
			date
		}, {
			user: user.id,
			date,
			symptoms,
			description
		}, {
			runValidators: true,
			returnDocument: "after"
		});
		// no validator errors
		if (!updated) {
			// input valid but no existing document with this date exists
			res.status(404);
			notFound = true;
			throw new Error();
		}
		// return result
		res.json(updated);
	} catch (err) {
		// throw error if failed (404 in case document with this date does not exist)
		let status,
			messagePath;
		if (notFound) {
			status = 404;
			messagePath = "logs.updateErrorDocumentNotFound";
		} else {
			status = 400;
			messagePath = "logs.updateErrorOther";
		}
		res.status(status);
		throw new Error(str(messagePath, date));
	}
});


export const deleteLog = asyncHandler(async (req, res) => {
	const {user, body} = req;
	const {date} = body;
	const entry = await Log.findOne({
		user: user.id,
		date
	});
	// throw error if an entry doesn't exist for this date already exists
	if (!entry) {
		res.status(400);
		throw new Error(str("logs.deleteErrorDateDoesntExist", date));
	}
	// deletion object
	const deletion = await Log.deleteOne({
		user: user.id,
		date
	});
	if (!deletion.deletedCount) {
		// a valid entry for deletion was found, but for some reason 0 items have been deleted
		res.status(500);
		throw new Error(str("logs.deleteErrorDateDoesntExist"));
	}
	res.json({entry});
});