import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    products: [{
        productId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Products"
        },
        variationId:{
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }

    ],
    totalPrice: {
        type: Number,
        default: 0
    },


}, { timestamps: true, versionKey: false });

export default mongoose.model("Cart", cartSchema)