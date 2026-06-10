import { body } from "express-validator";
import Fabric from "../models/Fabric.js";

export const createFabricRules = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isNumeric()
    .withMessage("El precio debe ser un numero"),
  body("stock")
    .notEmpty()
    .withMessage("El stock es requerido")
    .isNumeric()
    .withMessage("El stock debe ser un numero"),
  body("color").notEmpty().withMessage("El color es requerido"),
];