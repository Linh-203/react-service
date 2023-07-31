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
            weight:{
               type:Number,
               required:true
            },
            vendorId:{
               type:mongoose.Schema.Types.ObjectId,
               ref:'vendor',
               required:true
            },
            quantity:{
               type:Number,
               required:true
            }
         }
      ]
   },
   { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);
productSchema.index({ name: 'text' });
export default mongoose.model('Products', productSchema);
