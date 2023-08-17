import Category from '../models/categories.mjs';
import Product from '../models/products.mjs';
import Variation from '../models/variations.mjs';
import { productSchema } from '../validation/products.mjs';

const getAllProducts = async (req, res) => {
   try {
      const {
         _sort = 'createAt',
         _order = 'asc',
         _limit = 100000,
         _page = 1,
         _expand,
         _q = '',
         _from = 1,
         _to = 10000000,
         _cate = '',
         _inStock,
         _outStock
      } = req.query;
      const options = {
         page: _page,
         sort: {
            [_sort]: _order === 'desc' ? -1 : 1
         },
         collation: { locale: 'vi', strength: 1 }
      };
      if (_limit !== undefined) {
         options.limit = _limit;
      }
      const filters = {};
      if (_cate) {
         filters.categoryId = _cate;
      }
      if (_inStock == 'true') {
         filters.stock = { $gt: 0 };
      }
      if (_outStock == 'true') {
         filters.stock = 0;
      }
      const optionsSearch = _q !== '' ? { $text: { $search: _q } } : {};
      const populated =
         _expand !== undefined
            ? [
                 {
                    path: 'categoryId'
                 }
              ]
            : [];
      const products = await Product.paginate(
         { price: { $gte: _from, $lte: _to }, ...optionsSearch, ...filters },
         { ...options, populate: populated }
      );
      //dont know how can optimize performance under
      let inStocks = [];
      const maxPrice = await Product.find().sort({ price: -1 }).limit(1);
      if (_inStock !== 'true' && _outStock !== 'true') {
         inStocks = await Product.find({ stock: { $gt: 0 } });
      } else if (_inStock === 'true') {
         inStocks = products.docs.filter((product) => product.stock > 0);
      }
      //
      if (products.docs.length === 0) {
         res.json({
            message: 'No products found',
            data: []
         });
      } else {
         res.json({
            message: 'Get all products successfully',
            data: products.docs,
            pagination: {
               currentPage: products.page,
               totalPages: products.totalPages,
               totalItems: products.totalDocs
            },
            maxPrice: maxPrice[0].price,
            inStock: _outStock === 'true' ? 0 : inStocks.length
         });
      }
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

const getDetailProducts = async (req, res) => {
   try {
      const product = await Product.findOne({ _id: req.params.id }).populate([
         { path: 'categoryId', select: ['_id', 'name', 'image'] }
      ]);
      const variations = await Variation.find({ productId: req.params.id }).populate([
         { path: 'vendorId', select: ['name', 'origin'] }
      ]);
      const returnData = { ...product.toObject(), variations: variations ? variations : [] };
      if (product.length === 0) {
         res.json({
            message: 'No product found'
         });
      } else {
         res.json({
            message: 'Get product successfully',
            data: returnData
         });
      }
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

const removeProducts = async (req, res) => {
   try {
      const product = await Product.findOne({ _id: req.params.id });
      // const { isHardDelete } = req.body;
      if (product) {
         await Category.findOneAndUpdate(product.categoryId, {
            $pull: {
               products: product._id
            }
         });
      } else {
         res.status(500).send({ message: 'Delete failed' });
      }

      await Product.findOneAndDelete({ _id: req.params.id });

      res.json({
         message: 'Delete product successfully',
         data: product
      });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
};

const restorePrd = async (req, res) => {
   try {
      const id = req.params.id;
      const user = req.user;
      const product = await Product.findById(id);

      if (!user.role || user.role !== 'admin') {
         return res.status(403).json({
            message: 'Bạn không có quyền phục hồi sản phẩm'
         });
      }
      if (!product) {
         return res.status(404).json({
            message: 'Không tìm thấy sản phẩm'
         });
      }
      if (!product.deleted) {
         return res.status(400).json({
            message: 'Sản phẩm chưa bị xóa mềm'
         });
      }

      product.deleted = false;
      product.deletedAt = null;

      const restoredProduct = await product.save();

      return res.status(200).json({
         message: 'Phục hồi sản phẩm thành công',
         data: restoredProduct
      });
   } catch (error) {
      res.status(400).json({
         message: 'Phục hồi sản phẩm không thành công',
         error: error.message
      });
   }
};

const patchProducts = async (req, res) => {
   try {
      const { error } = productSchema.validate(req.body, { abortEarly: false });
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
      const product = await Product.findOne({ _id: req.params.id });
      if (!product) {
         return res.status(400).send({
            message: 'Không lấy được sản phẩm'
         });
      }
      //remove id product from Category if product delete categoryId
      await Category.findOneAndUpdate(product.categoryId, {
         $pull: {
            products: product._id
         }
      });
      //add id product from Category if product add categoryId
      await Category.findOneAndUpdate(
         { _id: product.categoryId },
         {
            $addToSet: {
               products: product._id
            }
         }
      );
      const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({
         message: 'Update product successfully',
         data: newProduct
      });
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

const createProducts = async (req, res) => {
   try {
      const { error } = productSchema.validate(req.body, { abortEarly: false });
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
      const product = await Product.create({
         ...req.body,
         stock: req.body.variations.reduce((quantity, item) => (quantity += item.quantity), 0)
      });
      if (!product) {
         return res.status(400).send({
            message: 'Error when add product'
         });
      }
      await Category.findByIdAndUpdate(product.categoryId, {
         $addToSet: {
            products: product._id
         }
      });
      res.json({
         message: 'Create product successfully',
         data: product
      });
   } catch (err) {
      res.status(500).json({
         message: err.message
      });
   }
};

export const product = {
   getAllProducts,
   getDetailProducts,
   removeProducts,
   patchProducts,
   createProducts
};
