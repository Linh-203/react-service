import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'vendor'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        required: true
     }

}, { timestamps: true, versionKey: false });

export default mongoose.model("variation", variationSchema)