import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const productSchema = new mongoose.Schema(
   {
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
      images: [
         {
            url: {
               type: String,
               required: true
            },
            public_id: {
               type: String,
               required: true
            }
         }
      ],
      discount: {
         type: Number,
         required: true
      },
      desc: {
         type: String,
         required: true
      },
      categoryId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Categories'
      },
      variations: [
         {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'variation'
         }
      ]
   },
   { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);
productSchema.index({ name: 'text' });
export default mongoose.model('Products', productSchema);
