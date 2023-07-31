import mongoose from 'mongoose';

const vendorSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   idProduct: {
      type: mongoose.Types.ObjectId,
      ref: 'product'
   },
   origin: {
      type: String,
      default: 'VietNam'
   }
});

const vendorModel = mongoose.model('vendor', vendorSchema);

export default vendorModel;
