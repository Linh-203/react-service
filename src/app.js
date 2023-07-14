import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/products"
import authRouter from "./routers/auth"
import cartRouter from "./routers/carts"
import orderRouter from "./routers/orders"
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api",productRouter)
app.use("/api",authRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)

mongoose.connect("mongodb://127.0.0.1:27017/React-N3")
.then(()=>console.log("kết nối thành công React-N3"))
.catch(err=>console.log(err))
export const viteNodeApp = app