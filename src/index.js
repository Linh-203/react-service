import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/products.mjs';
import categoryRouter from './routers/categories.mjs';
import authRouter from './routers/auth.mjs';
import cartRouter from './routers/carts.mjs';
import orderRouter from './routers/orders.mjs';
import uploadRouter from './routers/upload.mjs';
import userRouter from './routers/auth.mjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import vendorRoute from './routers/vendor.mjs';
import variationRouter from './routers/variation.mjs';

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
app.use('/api', variationRouter);
mongoose
   .connect('mongodb://127.0.0.1:27017/vegetables')
   .then(() => console.log('connect success'))
   .catch((err) => console.log(err));

app.listen(process.env.PORT)
