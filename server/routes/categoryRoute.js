import express from "express";
import { isAdmin, requredSignIn } from "../middlewares/authMiddleware.js";
import { createCategory } from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

//routes
categoryRoutes.post("/create-category", requredSignIn, isAdmin, createCategory);

export default categoryRoutes