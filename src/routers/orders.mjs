import express from "express";
import { cancelOrder, createOrder, filterOrders, getAdminOrders, getOrderDetail, getUserOrders, resetOrder, updateOrder } from "../controllers/orders.mjs";

const router = express.Router()

router.post("/order", createOrder)
router.get("/orderUser/:id", getUserOrders)
router.get("/order-admin", getAdminOrders)
router.get("/order/:id", getOrderDetail)
router.patch("/order/:id", updateOrder)
router.delete("/order/:id", cancelOrder)
router.post("/order/:id", resetOrder)
router.post("/orderFilter/:idUser", filterOrders)

export default router