import Category from '../models/categories';
import Joi from 'joi';
import Product from '../models/products';

const categorySchema = Joi.object({
   name: Joi.string().required().min(3),
   image: Joi.string().required(),
   products: Joi.array().items(Joi.string())
});

const getAllCategories = async (req, res) => {
   try {
      const categories = await Category.find({}).populate('products');
      if (categories.length === 0) {
         res.json({
            message: 'No category found'
         });
      } else {
         res.json({
            message: 'Get all categories successfully',
            data: categories
         });
      }
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

const getDetailCategory = async (req, res) => {
  
   try {
      const category = await Category.findOne({ _id: req.params.id });
      if (category.length === 0) {
         return res.json({
            message: 'No category found'
         });
      }
     
      if (!category) {
         return res.status(404).json({
            message: 'No products found in this category'
         });
      }
         return res.status(200).json({
         message :"Get categories successfully",
         category
            
         })
      
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

const removeCategories = async (req, res) => {
   try {
      const category = await Category.findOne({ _id: req.params.id });
      const defaultCategoryId = "64b646e60c3ef0986d3b1b33"; //id Danh mục mặc định

      await Product.updateMany(
         { category: category._id },
         { $set: { category: defaultCategoryId } }
      );

      const defaultCate = await Category.findByIdAndUpdate(defaultCategoryId, {
         $push: { products: category.products }
      },{new:true});

      await Category.findOneAndDelete({ _id: req.params.id });
      res.json({
         message: 'Delete category successfully',
         data: defaultCate
      });
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};


const patchCategories = async (req, res) => {
   try {
      const { error } = categorySchema.validate(req.body, { abortEarly: false });
      if (error) {
         const errs = [];
         for (const err of error.details) {
            errs.push(err.message);
         }
         return res.json({
            message: 'Form error',
            errors: errs
         });
      }
      await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      const category = await Category.findOne({ _id: req.params.id });
      res.json({
         message: 'Update category successfully',
         data: category
      });
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

const createCategory = async (req, res) => {
   try {
      const { error } = categorySchema.validate(req.body, { abortEarly: false });
      if (error) {
         const errs = [];
         for (const err of error.details) {
            errs.push(err.message);
         }
         return res.json({
            message: 'Form error',
            errors: errs
         });
      }
      const category = await Category.create(req.body);
      res.json({
         message: 'Create category successfully',
         data: category
      });
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

export const category = {
   getAllCategories,
   getDetailCategory,
   removeCategories,
   createCategory,
   patchCategories
};
