import express from "express"
import { userLogin, userRegister } from "../controllers/authController.js";

//router object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post("/register", userRegister);

//LOGIN || METHOD POST
router.post("/login", userLogin);

export default router