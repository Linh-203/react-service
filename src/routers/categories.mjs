import { category } from '../controllers/categories.mjs';
import express from 'express';
import authentication from '../middlewares/authenticateToken.mjs';
import authorization from '../middlewares/authorization.mjs';

const router = express.Router();

router.get('/categories', category.getAllCategories);
router.get('/categories/:id', category.getDetailCategory);
router.delete('/categories/:id', authentication, authorization, category.removeCategories);
router.patch('/categories/:id', authentication, authorization, category.patchCategories);
router.post('/categories', authentication, authorization, category.createCategory);

export default router;
