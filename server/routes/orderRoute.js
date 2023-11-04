import express from "express"
import { isAdmin, requredSignIn } from "../middlewares/authMiddleware.js";
import { getAllOrders, getOrders } from "../controllers/productController.js";
const orderRoutes = express.Router();

//ROUTES

//GET ORDERS ROUTE
orderRoutes.get("/orders", requredSignIn, getOrders)

//GET ALL ORDERS
orderRoutes.get("/all-orders", requredSignIn, isAdmin, getAllOrders)

export default orderRoutes