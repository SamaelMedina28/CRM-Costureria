import type { Request, Response } from "express";
import Fabric from "../models/Fabric.js";

export const create = async (req: Request, res: Response) => {
  const { name, price, stock, color, type } = req.body;
  const fabric = new Fabric({ name, price, stock, color, type, user: req.user?.id });
  await fabric.save();
  res.status(201).json({ message: "Tela creada correctamente", fabric });
};

export const getAll = async (req: Request, res: Response) => {
  const fabrics = await Fabric.find({ user: req.user!.id }).select("-__v").sort({ createdAt: -1 });
  res.status(200).json(fabrics);
}