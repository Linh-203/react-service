import { product } from '../controllers/products';
import express from 'express';
//import checkPermission from '../middlewares/checkPermission';

const router = express.Router()

router.get('/products', product.getAllProducts)
router.get('/products/:id', product.getDetailProducts)
router.delete('/products/:id', product.removeProducts)
router.patch('/products/:id', product.patchProducts)
router.post('/products', product.createProducts)
//router.post('/products/restore/:id', checkPermission, product.restorePrd)

export default router