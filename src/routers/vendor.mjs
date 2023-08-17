import { Router } from 'express';
import { createVendor, getAllVendor } from '../controllers/vendor.mjs';
const vendorRoute = Router();

vendorRoute.post('/vendor', createVendor);
vendorRoute.get('/vendor', getAllVendor);
export default vendorRoute;
