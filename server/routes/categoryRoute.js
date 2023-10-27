import express from "express";
import { isAdmin, requredSignIn } from "../middlewares/authMiddleware.js";
import { createCategory, getCategory, updateCategory } from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

//routes

//CREATE CATEGORY
categoryRoutes.post("/create-category", requredSignIn, isAdmin, createCategory);


//UPDATE CATEGORY
categoryRoutes.put("/update-category/:id", requredSignIn, isAdmin, updateCategory);

//GET ALL CATEGORYS
categoryRoutes.get("/get-category", getCategory);

export default categoryRoutes