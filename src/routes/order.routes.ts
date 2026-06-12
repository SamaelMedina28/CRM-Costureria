import express from "express";
import { createOrderValidations } from "../validations/order.validations.js"
import { validate } from "../middlewares/validate.js";
import { create, getAll, getById } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getAll)
router.get("/:id", getById)
router.post("/", createOrderValidations, validate, create)
  
export default router;