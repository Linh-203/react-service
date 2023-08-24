import Cart from '../models/carts.mjs';
import Products from '../models/products.mjs';
import { setCookie } from '../tools/createCookie.mjs';
// add cart
export const addToCart = async (req, res) => {
   try {
      const { quantity, productId, userId, variationId } = req.body;
      let cart = await Cart.findOne({ userId: userId });
      if (!cart) {
         cart = await Cart.create({
            userId: userId,
            products: [],
            totalPrice: 0
         });
      }
      const productIndex = cart.products.find((item) => item.productId == productId);
      const product = await Products.findById(productId);
      const price = product.price;
      if (!productIndex) {
         cart.products.push({
            productId: productId,
            price: price,
            quantity: quantity
         });

         //C2: dùng $push để thêm ptu vào mảng trong mongoDB
         //cart.updateOne({ $push: { products: { productId: productId, price: price, quantity: quantity }}})
      } else {
         productIndex.quantity += quantity;
      }
      cart.totalPrice += price * quantity;
      cart.save();
      await cart.populate('products.productId');

      return res.status(201).json({
         message: 'Create cart successfully',
         cart: { ...cart.pathsToScopes }
      });
   } catch (error) {
      return res.status(400).json({
         message: error.message
      });
   }
};
//Update quantity of product in cart
export const updateCart = async (req, res) => {
   try {
      const { quantity, productId, userId, variationId } = req.body;
      //tìm trong giỏ hàng theo idUser
      let cart = await Cart.findOne({ userId: userId });
      //tìm idProduct để sánh
      const productExits = cart.products.find((item) => item.productId == productId);
      const product = await Products.findById(productId);
      const price = product.price;
      if (productExits.quantity > quantity) {
         cart.totalPrice = cart.totalPrice - price * (productExits.quantity - quantity);
      } else {
         cart.totalPrice = cart.totalPrice + price * (quantity - productExits.quantity);
      }

      //tính lại tổng tiền xong mới cập nhật lại số lượng
      productExits.quantity = quantity;
      cart.save();
      await cart.populate('products.productId');

      return res.status(201).json({
         message: 'Update cart successfully',
         cart: { ...cart.pathsToScopes }
      });
   } catch (error) {
      return res.status(400).json({
         message: error.message
      });
   }
};
//Xóa 1 sản phẩm (.) giỏ hàng
export const removeOneProductInCart = async (req, res) => {
   try {
      const { userId } = req.body;
      //tìm trong giỏ hàng theo idUser
      let cart = await Cart.findOne({ userId: userId });
      //tìm idProduct để sánh
      if (!cart)
         return res.status(400).json({
            message: 'Not found cart',
            cart: {}
         });
      const productExits = cart.products.find((item) => item.productId == req.params.id);
      const product = await Products.findById(productExits.productId);
      const productIndex = cart.products.indexOf(productExits);

      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.totalPrice - product.price * productExits.quantity;
      if (cart.totalPrice == 0) {
         await cart.deleteOne({ id: cart._id });
         return res.status(203).json({
            message: 'Remove product in cart successfully => EmptyCart'
         });
      }
      cart.save();
      await cart.populate('products.productId');
      return res.status(201).json({
         message: 'Remove one product in cart successfully',
         cart
      });
   } catch (error) {
      return res.status(400).json({
         message: error.message
      });
   }
};
//C2 dùng $pull trong mongoDB
//await cart.updateOne({ $pull: { products: { productId: req.params.id }}});
//Xóa giỏ hàng
// export const removeCart = async (req, res) => {
//    try {
//       const { userId } = req.body;
//       //tìm trong giỏ hàng theo idUser
//       let cart = await Cart.findOne({ userId: userId });
//       console.log('Cart :', cart);
//       //Xóa giỏ hàng
//       await Cart.findByIdAndDelete(cart._id);

//       return res.status(201).json({
//          message: 'Remove cart successfully'
//       });
//    } catch (error) {
//       return res.status(400).json({
//          message: error.message
//       });
//    }
// };
//Lấy giỏ hàng theo idUser
export const getCartUser = async (req, res) => {
   try {
      //tìm trong giỏ hàng theo idUser
      let cart = await Cart.findOne({ userId: req.params.id });

      if (!cart) {
         return res.status(200).json({
            message: 'Cart not found',
            cart: {}
         });
      }
      await cart.populate('products.productId');
      const { cookieName, cookieValue, expire } = setCookie('demo', 'ahyhy', 1);
      res.cookie(cookieName, cookieValue, { expire: expire, httpOnly: true });
      return res.status(201).json({
         message: 'Get cart successfully',
         cart
      });
   } catch (error) {
      return res.status(400).json({
         message: error.message
      });
   }
};
