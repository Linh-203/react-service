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
mongoose
   .connect("mongodb://127.0.0.1:27017/vegetables")
   .then(() => console.log('connect success'))
   .catch((err) => console.log(err));
export const viteNodeApp = app;
