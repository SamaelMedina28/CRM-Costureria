import type { Request, Response } from "express";
import Measurement from "../models/Measurement.js";

export const getAll = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const measurements = await Measurement.find({user: userId});

  res.status(200).json(measurements);
}

export const create = async (req: Request, res: Response) => {
  const {clientName, height, chest, waist, hips, neck, shoulderWidth, sleeveLength, backLength, armhole, wrist, thigh, calf, ankle, otherNotes} = req.body;

  const measurement = new Measurement({user: req.user?.id, clientName, height, chest, waist, hips, neck, shoulderWidth, sleeveLength, backLength, armhole, wrist, thigh, calf, ankle, otherNotes});

  await measurement.save();

  res.status(201).json({message: "Medidas creadas correctamente", measurement});
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const measurement = await Measurement.findById(id)
  
  if (!measurement) {
    return res.status(404).json({ message: "Medida no encontrada" });
  }
  
  if (measurement.user?._id.toString() !== req.user!.id) {
    return res.status(403).json({ message: "No tienes permiso para ver esta medida" });
  }

  res.status(200).json({measurement});
}

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  const measurement = await Measurement.findById(id)

  if (!measurement) {
    return res.status(404).json({ message: "Medida no encontrada" });
  }

  if (measurement.user?._id.toString() !== req.user!.id) {
    return res.status(403).json({ message: "No tienes permiso para eliminar esta medida" });
  }

  await measurement.deleteOne();
  res.status(200).json({ message: "Medida eliminada correctamente" });
}