import type { Request, Response } from "express";
import Order from "../models/Order.js";

export const getAll = async (req: Request, res: Response) => {
  const { id } = req.user!;
  const orders = await Order.find({ user: id })
    .populate("client", "name")
    .populate("fabricsIHave.fabric", "name")
  res.status(200).json({ orders });
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