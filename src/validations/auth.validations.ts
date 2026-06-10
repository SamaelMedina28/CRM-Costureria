import { body } from "express-validator";
import User from "../models/User.js";

export const registerRules = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("name").isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
  body("email").notEmpty().withMessage("El correo es requerido"),
  body("email").isEmail().withMessage("El correo es invalido"),
  body("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error("El correo ya existe");
    }
    return true;
  }).withMessage("El correo ya existe"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("passwordConfirmation").notEmpty().withMessage("La confirmacion de la contraseña es requerida"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("La confirmacion de la contraseña no coincide");
    }
    return true;
  }).withMessage("La confirmacion de la contraseña no coincide"),
];

export const loginRules = [
  body("email").notEmpty().withMessage("El correo es requerido"),
  body("email").isEmail().withMessage("El correo es invalido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
];