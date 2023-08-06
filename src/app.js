import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/products';
import categoryRouter from './routers/categories';
import authRouter from './routers/auth';
import cartRouter from './routers/carts';
import orderRouter from './routers/orders';
import uploadRouter from './routers/upload';
import userRouter from './routers/users';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import vendorRoute from './routers/vendor';
const app = express();
dotenv.config();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', authRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);
app.use('/api', uploadRouter);
app.use('/api', userRouter);
app.use('/api', vendorRoute);
mongoose
   .connect("mongodb://127.0.0.1:27017/vegetables")
   .then(() => console.log('connect success'))
   .catch((err) => console.log(err));
export const viteNodeApp = app;