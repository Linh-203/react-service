import { product } from '../controllers/products';
import express from 'express';
import checkPermission from '../middlewares/authorization';
import authentication from '../middlewares/authenticateToken';
const router = express.Router();

router.get('/products', product.getAllProducts);
router.get('/products/:id', product.getDetailProducts);
router.delete('/products/:id', authentication, checkPermission, product.removeProducts);
router.patch('/products/:id', authentication, checkPermission, product.patchProducts);
router.post('/products', authentication, checkPermission, product.createProducts);

export default router;
