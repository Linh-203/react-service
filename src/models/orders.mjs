import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const orderSchema = new mongoose.Schema(
   {
      cartId: {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: 'Cart'
      },
      userId: {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: 'User'
      },
      customerName: {
         type: String,
         required: true
      },

      products: [
         {
            productId: {
               type: mongoose.Types.ObjectId,
               required: true,
               ref: 'Products'
            },
            quantity: {
               type: Number,
               required: true
            },
            price: {
               type: Number,
               required: true
            }
         }
      ],
      receivedDate: {
         type: String,
         default: ''
      },
      pay: {
         type: Boolean,
         default: false
      },
      note: {
         type: String
      },
      address: {
         type: String,
         required: true
      },
      phone: {
         type: String,
         required: true
      },
      totalPrice: {
         type: Number
      },
      status: {
         type: String,
         default: 'Chờ xác nhận'
      }
   },
   { timestamps: true, versionKey: false }
);
orderSchema.plugin(mongoosePaginate);
export default mongoose.model('Order', orderSchema);
