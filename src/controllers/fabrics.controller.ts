import type { Request, Response } from "express";
import Fabric from "../models/Fabric.js";

export const createFabric = async (req: Request, res: Response) => {
  const { name, price, stock, color, type } = req.body;
  const fabric = new Fabric({ name, price, stock, color, type, user: req.user?.id });
  await fabric.save();
  res.status(201).json({ message: "Tela creada correctamente", fabric });
};
