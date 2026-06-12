import { create } from "../controllers/client.controller.js";
import { createClientRules } from "../validations/client.validations.js";
import { validate } from "../middlewares/validate.js";
import express from "express";
const router = express.Router();

router.post("/", createClientRules, validate, create);

export default router;