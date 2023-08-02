import Joi from 'joi';

export const userSchema = Joi.object({
    _id: Joi.string().required(),
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   phone: Joi.string().required(),
   password: Joi.string().required(),
   avatar: Joi.string().default('https://lh5.googleusercontent.com/x14nnYSvR1c8KkO6Kj1giR4iZcQL0UelyqcGBRFt8fHQg8sRUouMkFc3b_F-kmDLDW-qpDo8KkBpuXGnfUNjy6NZVqwAcBYnngbupNd2scJqGyNpjYTGQZdfY3ktqFJZNsKfXR-YrDmqrcQwOrM4k2M'),
   role: Joi.string().valid('member', 'admin').default('member'),
});
