import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {getLogs, postLog, updateLog, deleteLog} from "../controllers/logsController.js";

const router = express.Router();


router.route("/")
	.get(protect, getLogs)
	.post(protect, postLog)
 	.put(protect, updateLog)
 	.delete(protect, deleteLog);

// router.route("/:id")
// 	.put(protect, updateLog)
// 	.delete(protect, deleteLog);

/*
router.route("/range")
// router.route("/:year/:month/(:day)?")
	.post(protect, dateByRange, logs);
*/

/* export router */
export default router;