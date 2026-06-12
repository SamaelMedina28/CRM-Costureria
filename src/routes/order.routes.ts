import express from "express";
import { createOrderValidations } from "../validations/order.validations.js"
import { validate } from "../middlewares/validate.js";
import { create } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrderValidations, validate, create)
  
export default router;