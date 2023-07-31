import Joi from 'joi';

export const productSchema = Joi.object({
   name: Joi.string().required().min(1),
   price: Joi.number().required().min(0),
   images: Joi.array().items(
      Joi.object({
         url: Joi.string().required(),
         public_id: Joi.string().required()
      }).required()
   ),
   discount: Joi.number().min(0),
   desc: Joi.string().required(),
   categoryId: Joi.string().required(),
   variations: Joi.array()
      .items(
         Joi.object({
            weight: Joi.number().required(),
            vendorId: Joi.string().required(),
            quantity: Joi.number().required()
         }).required()
      )
      .required()
});
