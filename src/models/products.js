
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

}, { timestamps: true, versionKey: false });
productSchema.plugin(mongoosePaginate)
productSchema.index({ name: 'text' })
export default mongoose.model("Products", productSchema)