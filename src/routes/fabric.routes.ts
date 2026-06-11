import express from "express";
import type { Request, Response } from "express";
import { createFabricRules } from "../validations/fabric.validations.js";
import { validate } from "../middlewares/validate.js";
import { create, getAll } from "../controllers/fabrics.controller.js";
const router = express.Router();

router.get("/", getAll); 
router.post("/", createFabricRules, validate, create);
router.put("/:id", (req: Request, res: Response) => {});
router.delete("/:id", (req: Request, res: Response) => {});


export default router;