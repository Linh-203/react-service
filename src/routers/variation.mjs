import { Router } from 'express';
import { createVariation, removeVariation } from '../controllers/variations.mjs';

const variationRouter = Router();

variationRouter.delete('/variations/:id', removeVariation);
variationRouter.post('/variations', createVariation);

export default variationRouter;
