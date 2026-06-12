import type { Request, Response } from "express";
import Client from "../models/Client.js";

export const create = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { name, phone, reference, rating } = req.body;
  const client = await Client.create({
    name,
    phone,
    reference,
    rating,
    user: userId,
  });
  return res.status(201).json({ message: "Client created successfully", client });
};