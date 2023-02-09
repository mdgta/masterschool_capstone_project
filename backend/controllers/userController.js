import asyncHandler from "express-async-handler";

const isPasswordStrong = (s) => (
	typeof s === "string" && // password is string
	s.trim() === s && // password does not start/end with spaces
	s.length >= 8 && // at least 8-characters long
	/[a-z]/.test(s) && // contains at least 1 lowercase letter
	/[A-Z]/.test(s) && // contains at least 1 uppercase letter
	!/(?<sameChar>.+)\k<sameChar>{2,}/.test(s) && // does not contain the a sequence of 3+ repeating characters
	!/(abc|xyz|pass|123)/i.test(s) && // user didn't have an issue fitting the shapes in the correct hole when they were 5
	!/^[A-Z][a-z]+\d{1,2}$/.test(s) && // can't be a name + 1-2 digits in the end, like Michael1
	!/hunter2/.test(s) // just because
);

export const register = asyncHandler(async (req, res) => {
	const {name, email, password, confirmPassword} = req.body;
	console.log("register", {name, email, password, confirmPassword});
	if (password !== confirmPassword) {
		throw new Error("account creation: passwords don't match");
	}
	if (!isPasswordStrong(password)) {
		throw new Error("account creation: password too weak");
	}
	res.json({testMessage: "register"});
	/* to-do:
		name must be unique (in any combination of letter casing)
		email not already used
		password===confirmPassword
	*/
});

export const login = asyncHandler(async (req, res) => {
	const {email, password} = req.body;
	console.log("login", {email, password});
	res.json({testMessage: "login"});
});