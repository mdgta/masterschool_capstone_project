import express from "express";
import {register, login, me} from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js";
// import * as protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register")
	.post(register);

router.route("/login")
	.post(login);


router.route("/me")
	// .post(protect.groups("exists"), me);
	.post(protect, me);

export default router;