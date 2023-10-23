import express from "express"
import { register } from "../controllers/authController.js";

//router object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post("/register", register);

export default router