import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  fabricsIHave: [
    {
      fabric: {
        type: Schema.Types.ObjectId,
        ref: "Fabric"
      },
      quantity: {
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
  deliveryDate: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  collection: "orders"
});

export default model("Order", orderSchema);
