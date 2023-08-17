import { variationSchema } from '../validation/variation.mjs';
import Variation from '../models/variations.mjs';
import Product from '../models/products.mjs';
export const createVariation = async (req, res) => {
   const { error } = variationSchema.validate(req.body, { abortEarly: false });
   if (error) {
      const errs = [];
      for (const err of error.details) {
         errs.push(err.message);
      }
      return res.status(400).send({
         message: 'Form error',
         errors: errs
      });
   }
   try {
      const variation = await Variation.create(req.body);
      const product = await Product.findByIdAndUpdate(
         { _id: req.body.productId },
         { $addToSet: { variations: variation._id } }
      );
      if (!product || !variation) {
         return res.status(400).send({
            message: 'Error when add product'
         });
      }
      res.json({
         message: 'Create variation successfully',
         data: variation
      });
   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
};

export const removeVariation = async (req, res) => {
   try {
      const variation = await Variation.findByIdAndDelete({ _id: req.params.id });
      const product = await Product.findOne({ _id: variation.productId });
      console.log(variation._id);
      if (product && product.variations.length > 0) {
         const updateVariations = product.variations.filter((item) => {
            console.log(item);
            console.log(variation._id == item);
         });
         await Product.findByIdAndUpdate({ _id: product.id }, { variations: updateVariations });
      }
      return res.json({
         message: 'Delete product successfully',
         data: variation
      });
   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
};
