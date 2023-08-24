import Joi from 'joi';

export const variationSchema = Joi.object({
   weight: Joi.number().required(),
   quantity: Joi.number().required(),
   vendorId: Joi.string().required(),
   productId: Joi.string().required()
});
