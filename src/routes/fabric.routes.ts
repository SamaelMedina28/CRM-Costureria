import express from "express";
import type { Request, Response } from "express";
import { createFabricRules } from "../validations/fabric.validations.js";
import { validate } from "../middlewares/validate.js";
import { create, getAll, getOne, destroy } from "../controllers/fabrics.controller.js";
const router = express.Router();

router.get("/", getAll);
router.post("/", createFabricRules, validate, create);
router.get("/:id", getOne);
router.put("/:id", (req: Request, res: Response) => {});
router.delete("/:id", destroy);


export default router;