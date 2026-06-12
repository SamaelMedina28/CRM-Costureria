import express from "express";
import { createOrderValidations, updateOrderValidations } from "../validations/order.validations.js"
import { validate } from "../middlewares/validate.js";
import { create, getAll, getById, update } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getAll)
router.get("/:id", getById)
router.post("/", createOrderValidations, validate, create)
router.put("/:id", updateOrderValidations, validate, update)
  
export default router;