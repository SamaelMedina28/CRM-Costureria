import type { Request, Response } from "express";
import Measurement from "../models/Measurement.js";

export const create = async (req: Request, res: Response) => {
  const {clientName, height, chest, waist, hips, neck, shoulderWidth, sleeveLength, backLength, armhole, wrist, thigh, calf, ankle, otherNotes} = req.body;

  const measurement = new Measurement({user: req.user?.id, clientName, height, chest, waist, hips, neck, shoulderWidth, sleeveLength, backLength, armhole, wrist, thigh, calf, ankle, otherNotes});

  await measurement.save();

  res.status(201).json({message: "Medidas creadas correctamente", measurement});
}