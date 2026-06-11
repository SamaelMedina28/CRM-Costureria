import { body } from "express-validator";

export const createMeasurementRules = [
  body("clientName").notEmpty().withMessage("El nombre del cliente es requerido"),
];

export const editMeasurementRules = [
  body("clientName").optional().notEmpty().withMessage("El nombre del cliente es requerido"),
];
