import vendorModel from '../models/vendor';
import { vendorSchema } from '../validation/vendor';

export const createVendor = async (req, res) => {
   const { error } = vendorSchema.validate(req.body, { abortEarly: false });
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
      const vendor = await vendorModel.create(req.body);
      if (!vendor)
         return res.status(400).json({
            message: 'Create error'
         });
      return res.status(200).json({
         message: 'Create vendor data success',
         data: vendor
      });
   } catch (error) {
      console.log(error);
      return res.status(400).json({
         message: 'Error'
      });
   }
};
