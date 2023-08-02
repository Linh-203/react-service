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

export const getAllVendor = async (req, res) => {
   try {
      const vendors = await vendorModel.find();
      if (!vendors)
         return res.status(400).json({
            message: 'Cannot get vendors'
         });
      if (vendors.length === 0)
         return res.status(200).json({
            message: 'Not found any vendors',
            data: []
         });
      return res.status(200).json({
         message: 'Get all vendor success!',
         data: vendors
      });
   } catch (error) {
      console.log(error);
      return res.status(400).json({
         message: 'Error'
      });
   }
};
