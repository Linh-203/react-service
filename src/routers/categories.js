import { category } from '../controllers/categories';
import express from 'express';
import authentication from '../middlewares/authenticateToken';
import checkPermission from '../middlewares/authorization';

const router = express.Router();

router.get('/categories', category.getAllCategories);
router.get('/categories/:id', category.getDetailCategory);
router.delete('/categories/:id', authentication, checkPermission, category.removeCategories);
router.patch('/categories/:id', authentication, checkPermission, category.patchCategories);
router.post('/categories', authentication, checkPermission, category.createCategory);

export default router;
