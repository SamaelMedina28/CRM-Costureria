import { Schema, model } from "mongoose";

const measurementSchema = new Schema(
  {
    // Usuario al que pertenecen estas medidas
    user: {
      type: String,
      required: true,
    },

    // Atributos físicos básicos
    height: { type: Number, required: false }, // Altura (cm)

    // Medidas corporales principales
    chest: { type: Number, required: false }, // Pecho / Busto (cm)
    waist: { type: Number, required: false }, // Cintura (cm)
    hips: { type: Number, required: false }, // Cadera (cm)

    // Medidas adicionales
    neck: { type: Number, required: false }, // Cuello (cm)
    shoulderWidth: { type: Number, required: false }, // Ancho de hombros (cm)
    sleeveLength: { type: Number, required: false }, // Largo de manga (cm)
    backLength: { type: Number, required: false }, // Largo de espalda (cm)
    armhole: { type: Number, required: false }, // Sisa / Contorno de sisa (cm)
    wrist: { type: Number, required: false }, // Muñeca (cm)
    thigh: { type: Number, required: false }, // Muslo (cm)
    calf: { type: Number, required: false }, // Pantorrilla (cm)
    ankle: { type: Number, required: false }, // Tobillo (cm)

    // Additional notes about the measurements
    otherNotes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
    collection: "measurements",
  },
);

export default model("Measurement", measurementSchema);
