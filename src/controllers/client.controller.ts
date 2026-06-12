import type { Request, Response } from "express";
import Client from "../models/Client.js";

export const getAll = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const clients = await Client.find({ user: userId }).sort({ name: "asc" });
  return res.status(200).json(clients);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  if (!client) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  return res.status(200).json(client);
};

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
  return res.status(201).json({ message: "Cliente creado exitosamente", client });
};