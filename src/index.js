import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
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
import { Server } from 'socket.io';
dotenv.config();

const app = express();
const httpServer = createServer(app);
const socketServer = new Server(httpServer, {
   cors: '*'
});
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

socketServer.on('connection', (socket) => {
   console.log('connect socket');
});
socketServer.of('/admin').on('connection', (socket) => {
   socket.on('newOrder', ({ data }) => {
      const returnData = {
         eventId: socket.id,
         notice: `New Order by ${data.user.name} has placed!`,
         order: data.order
      };
      socketServer.of('/admin').emit('orderConfirm', { data: returnData });
   });
});

httpServer.listen(8000);
