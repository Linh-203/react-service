
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    }]

}, { timestamps: true, versionKey: false });
categorySchema.plugin(mongoosePaginate)
categorySchema.index({ name: 'text' })
export default mongoose.model("Categories", categorySchema)