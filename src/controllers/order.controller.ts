import type { Request, Response } from "express";
import Order from "../models/Order.js";

export const create = async (req: Request, res: Response) => {
  try {
    const { client, fabricsIHave, fabricsINeed, status } = req.body;
    const order = new Order({
      user: req.user!.id,
      client,
      fabricsIHave,
      fabricsINeed,
      status,
    });
    await order.save();
    res.status(201).json({ ok: true, data: order });
  } catch (error) {
    if(error instanceof Error) {
      return res.status(400).json({ ok: false, error: error.message });
    }
    res.status(500).json({ ok: false, error: "Error al crear la orden" });
  }
}