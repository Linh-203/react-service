import { category } from '../controllers/categories';
import express from 'express';
//import checkPermission from '../middlewares/checkpermission';

const router = express.Router();

router.get('/categories', category.getAllCategories);
router.get('/categories/:id', category.getDetailCategory);
router.delete('/categories/:id', category.removeCategories);
router.put('/categories/:id', category.patchCategories);
router.post('/categories', category.createCategory);

export default router;
