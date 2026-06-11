import express from "express";
import { createMeasurementRules, editMeasurementRules } from "../validations/measurement.validations.js";
import { validate } from "../middlewares/validate.js";
import { create} from "../controllers/measurement.controller.js";
const router = express.Router();

// router.get("/", getAll);
router.post("/", createMeasurementRules, validate, create);
// router.get("/:id", getOne);
// router.put("/:id", editMeasurementRules, validate, update);
// router.delete("/:id", destroy);


export default router;