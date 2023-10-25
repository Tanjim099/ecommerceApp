import express from "express"
import { logout, test, userLogin, userRegister } from "../controllers/authController.js";
import { isAdmin, requredSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post("/register", userRegister);

//LOGIN || METHOD POST
router.post("/login", userLogin);

//LOGOUT || METHOD GET
router.get("/logout", logout)
//TEST
router.get("/test", requredSignIn, isAdmin, test)

export default router