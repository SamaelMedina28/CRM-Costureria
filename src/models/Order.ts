import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  fabricsIHave: [
    {
      fabric: {
        type: Schema.Types.ObjectId,
        ref: "Fabric"
      },
      quantity: { // TODO: cuando se complete como completado el pedido se tienen que restar la cantidad de tela que se uso en el stock
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  fabricsINeed: [
    {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ["pending", "delievered", "cancelled"],
    default: "pending",
  },
}, {
  timestamps: true,
  collection: "orders"
});

export default model("Order", orderSchema);
