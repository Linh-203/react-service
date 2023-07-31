import { Router } from 'express';
import { createVendor } from '../controllers/vendor';
const vendorRoute = Router();

vendorRoute.post('/vendor', createVendor);

export default vendorRoute;
