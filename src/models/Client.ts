import { Schema, model } from "mongoose";

const clientSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        reference: { type: String },
        phone: { type: String, maxLength: 15 },
        rating: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 },
        // TODO: Falta por agregar la relacion con los pedidos
    },
    {
        timestamps: true,
        collection: "clients",
    },
);

export default model("Client", clientSchema);
