const errorMiddleware = (err, req, res, next) => {
	// status code (if passed)
	const {statusCode} = req;
	// response object
	const responseObject = {
		error: err.message
	}
	// add stack trace ONLY while in development mode
	console.log(process.env.NODE_ENV, process.env.NODE_ENV === "development");
	if (process.env.NODE_ENV === "development") {
		responseObject.stack = err.stack;
	}
	res.status(statusCode || 500).json(responseObject);
}

export default errorMiddleware;