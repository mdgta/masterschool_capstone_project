import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {str} from "../util/strings.js";

/*\
|*|
|*|
|*| this middleware handles: protection access of various groups
|*|
|*|
\*/

export const protect = asyncHandler(async (req, res, next) => {
	const {authorization: auth} = req.headers;
	// ensure that auth is defined
	if (typeof auth !== "string" || !auth.startsWith("Bearer ")) {
		res.status(403);
		throw new Error(str("protect.tokenValidityError"));
	}
	// get token from authentication
	const [bearer, token] = auth.split(" ");
	let tokenData;
	const {JWT_SECRET} = process.env;
	// verify token
	try {
		tokenData = jwt.verify(token, JWT_SECRET);
	} catch (err) {
		res.status(403);
		throw new Error(str("protect.tokenValidityError"));
	}
	const {id} = tokenData;
	const user = await User.findById(id).select("-password");
	// if token valid but user doesn't exist (e.g. token valid but user in db got deleted)
	if (!user) {
		throw new Error(str("protect.tokenValidityError"));
	}
	req.user = user;
	next();
});