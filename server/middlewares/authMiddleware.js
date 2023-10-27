import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js"

//Protected Routes token base
export const requredSignIn = async (req, res, next) => {
    // const { token } = req.cookies;
    // console.log("token", token)
    // if (!token) {
    //     return next(new AppError("Unauthenticated, please login", 400))
    // }
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        console.log(decode)
        req.user = decode
        next();
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== "ADMIN") {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        }
        else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }
}