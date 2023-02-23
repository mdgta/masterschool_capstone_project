import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {str} from "../util/strings.js";

/* regular expressions */
const re = {};
// contains at least 1 lowercase letter
re.containsLowercase = /[a-z]/;
// contains at least 1 uppercase letter
re.containsUppercase = /[A-Z]/;
// matching a sequence of 3+ repeating characters
re.repeatingCharacterX3 = /(?<sameChar>.+)\k<sameChar>{2,}/;
// user didn't have an issue fitting the shapes in the correct hole when they were 5
re.userCouldFitTheSquareIntoTheSquareHoleWhenTheyWereFiveYearsOld = /(abc|xyz|pass|123)/i,
// can't be a name + 1-2 digits in the end, like Michael1
re.simpleNameWithShortNumber = /^[A-Z][a-z]+\d{1,2}$/;
// just because
re.idiotRadar = /hunter2/i;
// username: valid pattern
// (can only contains english letters, digits, underscores or minus signs)
// at least 4 characters long
re.usernameValidPattern = /^[a-zA-Z0-9_\-]{4,}$/;



/* functions */

const isPasswordStrong = (s) => (
	typeof s === "string" && // password is string
	s.trim() === s && // password does not start/end with spaces
	s.length >= 8 && // at least 8-characters long
	// pretty much self-explanatory, but see see regex section for more info
	// matches:
	re.containsLowercase.test(s) &&
	re.containsUppercase.test(s) &&
	// does not match:
	!re.repeatingCharacterX3.test(s) &&
	!re.userCouldFitTheSquareIntoTheSquareHoleWhenTheyWereFiveYearsOld.test(s) &&
	!re.simpleNameWithShortNumber.test(s) &&
	!re.idiotRadar.test(s)
);

const isNameValid = (s) => (
	// WARNING! if more characters are allowed in the future, review nameTaken in areRegistrationCredentialsValid
	// to see if there's need to escape more control characters in the findOne regex
	typeof s === "string" && // is string
	re.usernameValidPattern.test(s) // valid pattern (see re for full description)
);

const generateToken = (id) => {
	const {JWT_SECRET} = process.env;
	console.log({JWT_SECRET});
	return jwt.sign({id}, JWT_SECRET, {
		expiresIn: "30d"
	});
}

const areRegistrationCredentialsValid = async ({name, email, password, confirmPassword}) => {
	// confirmed password matches password
	if (password !== confirmPassword) {
		return str("auth.register.passwordConfirmError");
	}
	// check if password is strong enough
	if (!isPasswordStrong(password)) {
		return str("auth.register.passwordWeakError");
	}
	// check if name is valid
	if (!isNameValid(name)) {
		return str("auth.register.nameValidityError");
	}
	// check if name taken
	const nameTaken = await userModel.findOne({
		// case-insensitive, only need to escape hyphens (see comment in isNameValid)
		name: new RegExp(`^${name.replace(/\-/g, "\\-")}$`, "i")
	});
	if (nameTaken) {
		return str("auth.register.nameTakenError");
	}
	// check if account already exists
	const emailTaken = await userModel.findOne({email});
	if (emailTaken) {
		return str("auth.register.emailTakenError");
	}
	return true;
}

export const register = asyncHandler(async (req, res) => {
	const {name, email, password, confirmPassword} = req.body;
	if (!(name && email && password && confirmPassword)) {
		// missing data
		throw new Error(str("auth.register.missingDataError"));
	}
	const validityStatus = await areRegistrationCredentialsValid({name, email, password, confirmPassword});
	if (validityStatus !== true) {
		// validityStatus is not true- throw the value the (error message)
		throw new Error(validityStatus);
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = await userModel.create({
		name,
		email,
		password: hash
	});
	res.status(201).json({
		name: user.name,
		email: user.email
	});
});

export const login = asyncHandler(async (req, res) => {
	const {email, password} = req.body;
	const user = await userModel.findOne({email});
	// check login details
	if (!user || !await bcrypt.compare(password, user.password)) {
		res.status(404);
		throw new Error(str("auth.login.invalidCredentialsError"));
	}
	// send token
	const token = generateToken(user._id);
	res.send({token});
});

export const me = asyncHandler(async (req, res) => {
	 const {user} = req;
	res.json(user);
});