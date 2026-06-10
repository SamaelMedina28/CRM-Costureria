import type { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/hashBcrypt.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ message: "Usuario creado correctamente", user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }
  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }
  const token  = jwt.sign({ id: user._id}, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
  res.cookie("token", token,{
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1 hour
  });
  res.status(200).json({ message: "Se logueo correctamente" });
};

//  Log out 
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Se deslogueo correctamente" });
};
