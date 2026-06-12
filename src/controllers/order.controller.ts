import type { Request, Response } from "express";
import Order from "../models/Order.js";

export const getAll = async (req: Request, res: Response) => {
  const { id } = req.user!;
  const orders = await Order.find({ user: id })
    .populate("client", "name")
    .populate("fabricsIHave.fabric", "name")
  res.status(200).json({ orders });
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("client", "name")
    .populate("fabricsIHave.fabric", "name price")
  res.status(200).json({ order });
}

export const create = async (req: Request, res: Response) => {
    const { client, fabricsIHave, fabricsINeed, status } = req.body;
    const order = new Order({
      user: req.user!.id,
      client,
      fabricsIHave,
      fabricsINeed,
      status,
    });
    await order.save();
    res.status(201).json({ order, message: "Orden creada correctamente" });
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { client, fabricsIHave, fabricsINeed } = req.body;
  const order = await Order.findByIdAndUpdate(id, {
    client,
    fabricsIHave,
    fabricsINeed,
  }, { new: true });
  res.status(200).json({ order, message: "Orden actualizada correctamente" });
}