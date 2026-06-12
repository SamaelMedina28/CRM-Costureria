import { body, param } from "express-validator";

export const createOrderValidations = [
  body("client")
    .notEmpty()
    .withMessage("El cliente es requerido"),
  body("fabricsIHave")
    .notEmpty()
    .withMessage("Las telas que tienes son requeridas")
    .isArray()
    .withMessage("Las telas que tienes deben ser un array")
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Debe haber al menos una tela");
      }
      return true;
    }),
  body("fabricsIHave.*.fabric")
    .notEmpty()
    .withMessage("La tela es requerida")
    .isMongoId()
    .withMessage("La tela debe ser un id valido"),
  body("fabricsIHave.*.quantity")
    .notEmpty()
    .withMessage("La cantidad es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un numero mayor a 0"),
  body("fabricsINeed")
    .notEmpty()
    .withMessage("Las telas que necesitas son requeridas")
    .isArray()
    .withMessage("Las telas que necesitas deben ser un array")
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Debe haber al menos una tela");
      }
      return true;
    }),
  body("fabricsINeed.*.name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre debe ser un string"),
  body("fabricsINeed.*.color")
    .notEmpty()
    .withMessage("El color es requerido")
    .isString()
    .withMessage("El color debe ser un string"),
  body("fabricsINeed.*.quantity")
    .notEmpty()
    .withMessage("La cantidad es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un numero mayor a 0"),
  body("status")
    .notEmpty()
    .withMessage("El estado es requerido")
    .isIn(["pending", "delievered", "cancelled"]),
];
