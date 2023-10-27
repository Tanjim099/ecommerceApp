import express from "express";
import { isAdmin, requredSignIn } from "../middlewares/authMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, productImage } from "../controllers/productController.js";
import formidable from "express-formidable"

const productRouter = express.Router();

//ROUTES

//CREATE PRODUCT
productRouter.post("/create-product", requredSignIn, isAdmin, formidable(), createProduct);

//GET ALL PRODUCT
productRouter.get("/getall-products", getAllProducts);

//GET SINGLE PRODUCT
productRouter.get("/get-product/:slug", getProduct);

//GET PRODUCT IMAGE
productRouter.get("/product-image/:pid", productImage);

//DELETE PRODUCT
productRouter.delete("/delete-product/:pid", deleteProduct);

export default productRouter