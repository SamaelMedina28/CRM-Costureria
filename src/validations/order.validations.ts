import { body } from "express-validator";
import Order from "../models/Order.js";
// Verificar que en fabricsIHave la cantidad sea menor o igual a la cantidad que hay en la tela
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
    .withMessage("La cantidad debe ser un numero mayor a 0")
    .custom((value, { req }) => {
      const fabricInOrder = req.body.fabricsIHave.find((fabric: any) => fabric.fabric === value);
      if (fabricInOrder && value > fabricInOrder.quantity) {
        throw new Error("La cantidad no puede ser mayor a la cantidad de la tela en stock");
      }
      return true;
    }),
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
    .optional()
    .isIn(["pending", "delievered", "cancelled"])
    .withMessage("El estado es invalido"),
  body("title")
    .notEmpty()
    .withMessage("El titulo es requerido")
    .isString()
    .withMessage("El titulo debe ser un string"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion es requerida")
    .isString()
    .withMessage("La descripcion debe ser un string"),
  body("deliveryDate")
    .notEmpty()
    .withMessage("La fecha de entrega es requerida")
    .isString()
    .withMessage("La fecha de entrega debe ser un string"),
];

export const updateOrderValidations = [
  body("client")
    .optional()
    .notEmpty()
    .withMessage("El cliente es requerido"),
  body("fabricsIHave")
    .optional()
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
    .optional()
    .notEmpty()
    .withMessage("La tela es requerida")
    .isMongoId()
    .withMessage("La tela debe ser un id valido"),
  body("fabricsIHave.*.quantity")
    .optional()
    .notEmpty()
    .withMessage("La cantidad es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un numero mayor a 0")
    .custom((value, { req }) => {
      const fabricInOrder = req.body.fabricsIHave.find((fabric: any) => fabric.fabric === value);
      if (fabricInOrder && value > fabricInOrder.quantity) {
        throw new Error("La cantidad no puede ser mayor a la cantidad de la tela en stock");
      }
      return true;
    }),
  body("fabricsINeed")
    .optional()
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
    .optional()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre debe ser un string"),
  body("fabricsINeed.*.color")
    .optional()
    .notEmpty()
    .withMessage("El color es requerido")
    .isString()
    .withMessage("El color debe ser un string"),
  body("fabricsINeed.*.quantity")
    .optional()
    .notEmpty()
    .withMessage("La cantidad es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un numero mayor a 0"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El titulo es requerido")
    .isString()
    .withMessage("El titulo debe ser un string"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripcion es requerida")
    .isString()
    .withMessage("La descripcion debe ser un string"),
  body("deliveryDate")
    .notEmpty()
    .withMessage("La fecha de entrega es requerida")
    .isString()
    .withMessage("La fecha de entrega debe ser un string"),
];

export const changeStatusOrderValidations = [
  body("status")
    .notEmpty()
    .withMessage("El estado es requerido")
    .isIn(["delievered", "cancelled"])
    .withMessage("El estado es invalido")
];