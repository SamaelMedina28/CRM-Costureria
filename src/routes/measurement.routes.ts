import express from "express";
import { createMeasurementRules, editMeasurementRules } from "../validations/measurement.validations.js";
import { validate } from "../middlewares/validate.js";
import { create, destroy, getAll, getOne } from "../controllers/measurement.controller.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", createMeasurementRules, validate, create);
// router.put("/:id", editMeasurementRules, validate, update);
router.delete("/:id", destroy);


export default router;