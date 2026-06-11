import express from "express";
import { createFabricRules, editFabricRules } from "../validations/fabric.validations.js";
import { validate } from "../middlewares/validate.js";
import { create, getAll, getOne, destroy, update } from "../controllers/fabrics.controller.js";
const router = express.Router();

router.get("/", getAll);
router.post("/", createFabricRules, validate, create);
router.get("/:id", getOne);
router.put("/:id", editFabricRules, validate, update);
router.delete("/:id", destroy);


export default router;