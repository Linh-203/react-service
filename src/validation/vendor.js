import Joi from 'joi';

export const vendorSchema = Joi.object({
   name: Joi.string().required(),
   origin: Joi.string()
});
