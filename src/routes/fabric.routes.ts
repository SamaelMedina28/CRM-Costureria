import express from "express";
import type { Request, Response } from "express";
import { createFabricRules } from "../validations/fabric.validations.js";
import { validate } from "../middlewares/validate.js";
import { createFabric } from "../controllers/fabrics.controller.js";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {});
router.post("/", createFabricRules, validate, createFabric);
router.put("/:id", (req: Request, res: Response) => {});
router.delete("/:id", (req: Request, res: Response) => {});


export default router;