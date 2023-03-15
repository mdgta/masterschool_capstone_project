import asyncHandler from "express-async-handler";

export const dateByPath = asyncHandler(async (req, res, next) => {
	console.log("dateMiddleware/dateByPath", {params: req.params});
	// get parameters
	const {year, month, day} = req.params;
	// define output
	const dateRange = {
		raw: {year, month, day}
	};
	// add date object to request body
	req.dateRange = dateRange;
	// continue
	next();
});

// timestamp
const dateSearchParamRegex = /^\d+$/;

// return timestamp as number (expected input is a string)
// or `false` if it is not a valid non-negative integer
const validateTimestamp = (timestamp) => {
	const n = Number(timestamp),
		isValidTimestamp = (
			dateSearchParamRegex.test(timestamp) && // input timestamp (string) only includes digits
			Number.isInteger(n) // can be invalid if timestamp is too long to be a valid js number
		);
	return isValidTimestamp ? n : false;
}

const constructDateRange = ({startDate, endDate}) => {
	console.log({startDate, endDate});
	const start = validateTimestamp(startDate),
		end = validateTimestamp(endDate),
		dateRange = {};
	// lower bound
	if (start !== false) {
		dateRange.start = start;
	}
	// upper bound
	if (end !== false) {
		dateRange.end = end;
	}
	return dateRange;
}

export const dateByRange = asyncHandler(async (req, res, next) => {
	console.log("dateMiddleware/dateByRange");
	req.dateRange = constructDateRange(req.query);
	// continue
	next();
});