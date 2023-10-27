import express from "express";
import { isAdmin, requredSignIn } from "../middlewares/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";
import formidable from "express-formidable"

const productRouter = express.Router();

//ROUTES

//CREATE PRODUCT
productRouter.post("/create-product", requredSignIn, isAdmin, formidable(), createProduct);

export default productRouter