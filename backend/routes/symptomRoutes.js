import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {symtpomsMiddleware} from "../middleware/symtpomsMiddleware.js";
import {getSymptoms, updateSymptoms, resetToDefaultSymptoms} from "../controllers/symptomController.js";

const router = express.Router();


router.route("/")
	.get(protect, symtpomsMiddleware, getSymptoms)
	.put(protect, symtpomsMiddleware, updateSymptoms);

router.route("/reset")
	.post(protect, symtpomsMiddleware, resetToDefaultSymptoms);

/* export router */
export default router;