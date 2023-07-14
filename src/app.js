import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/products"
import categoryRouter from "./routers/categories"
import authRouter from "./routers/auth"
import cartRouter from "./routers/carts"
import orderRouter from "./routers/orders"
import dotenv from "dotenv";
import cors from "cors"
const app = express();
dotenv.config()
app.use(cors())
app.use(express.json())


app.use("/api",productRouter)
app.use("/api",categoryRouter)
app.use("/api",authRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("kết nối thành công React-N3"))
.catch(err=>console.log(err))
export const viteNodeApp = app