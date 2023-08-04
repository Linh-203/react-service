import express from "express";
import { addToCart, getCartUser, removeOneProductInCart, updateCart } from "../controllers/carts";


const router = express.Router()

router.post("/cart", addToCart)
router.patch("/cart", updateCart)
router.post("/cart/:id", removeOneProductInCart)
router.get("/cart/:id", getCartUser)

export default router