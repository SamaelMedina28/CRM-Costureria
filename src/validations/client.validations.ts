import { body } from "express-validator";

export const createClientRules = [
  body("name")
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("phone")
    .optional()
    .matches(/^[0-9]{10}$/).withMessage("El telefono debe tener 10 digitos"),

  body("rating")
    .optional()
    .isIn([1, 2, 3, 4, 5]).withMessage("La calificacion debe ser un numero entre 1 y 5")
]

export const updateClientRules = [
  body("name")
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("phone")
    .optional()
    .matches(/^[0-9]{10}$/).withMessage("El telefono debe tener 10 digitos"),

  body("rating")
    .optional()
    .isIn([1, 2, 3, 4, 5]).withMessage("La calificacion debe ser un numero entre 1 y 5")
]
