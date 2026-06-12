import { create, destroy, getAll, getById, update } from "../controllers/client.controller.js";
import { createClientRules, updateClientRules } from "../validations/client.validations.js";
import { validate } from "../middlewares/validate.js";
import express from "express";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createClientRules, validate, create);
router.put("/:id", updateClientRules, validate, update);
router.delete("/:id", destroy);

export default router;