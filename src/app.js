import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/products';
import categoryRouter from './routers/categories';
import authRouter from './routers/auth';
import cartRouter from './routers/carts';
import orderRouter from './routers/orders';
import uploadRouter from './routers/upload';

import cors from 'cors';
import dotenv from 'dotenv';
import vendorRoute from './routers/vendor';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', authRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);
app.use('/api', uploadRouter);
app.use('/api', vendorRoute);
mongoose
   .connect(process.env.MONGO_URL)
   .then(() => console.log('connect success'))
   .catch((err) => console.log(err));
export const viteNodeApp = app;
