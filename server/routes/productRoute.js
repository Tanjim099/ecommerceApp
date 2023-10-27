import express from "express";
import { isAdmin, requredSignIn } from "../middlewares/authMiddleware.js";
import { createProduct, getAllProducts, getProduct } from "../controllers/productController.js";
import formidable from "express-formidable"

const productRouter = express.Router();

//ROUTES

//CREATE PRODUCT
productRouter.post("/create-product", requredSignIn, isAdmin, formidable(), createProduct);

//GET ALL PRODUCT
productRouter.get("/getall-products", getAllProducts);

//GET SINGLE PRODUCT
productRouter.get("/get-product/:slug", getProduct);

export default productRouter