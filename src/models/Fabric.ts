import { Schema, model } from "mongoose";

const fabricSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    collection: "fabrics"
});

export default model("Fabric", fabricSchema);