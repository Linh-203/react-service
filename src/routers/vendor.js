import { Router } from 'express';
import { createVendor, getAllVendor } from '../controllers/vendor';
const vendorRoute = Router();

vendorRoute.post('/vendor', createVendor);
vendorRoute.get('/vendor', getAllVendor);
export default vendorRoute;
