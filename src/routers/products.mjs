import { product } from '../controllers/products.mjs';
import express from 'express';
import authorization from '../middlewares/authorization.mjs';
import authentication from '../middlewares/authenticateToken.mjs';
const router = express.Router();

router.get('/products', product.getAllProducts);
router.get('/products/:id', product.getDetailProducts);
router.delete('/products/:id', authentication, authorization, product.removeProducts);
router.patch('/products/:id', authentication, authorization, product.patchProducts);
router.post('/products', authentication, authorization, product.createProducts);

export default router;
