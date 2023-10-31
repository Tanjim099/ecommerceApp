import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js"

//Protected Routes token base
export const requredSignIn = async (req, res, next) => {
    // console.log(req.cookies)
    const { token } = req.cookies;
    // console.log("token", token)
    if (!token) {
        return next(new AppError("Unauthenticated, please login", 400))
    }
    // try {
    //     const decode = JWT.verify(req.cookies.token, process.env.JWT_SECRET);
    //     console.log(decode)
    //     req.user = decode
    //     next();
    // } catch (error) {
    //     console.log("jwts", error)
    // }

    const tokenDetails = JWT.verify(token, process.env.JWT_SECRET);
    if (!tokenDetails) {
        return next(new AppError("Unauthenticated, please login", 401))
    }

    req.user = tokenDetails;
    // console.log(tokenDetails)

    next();
}

// Middleware for protecting routes
export function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
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


export const validateBody = (req, res, next) => {
    const requiredParams = ["checked", "radio"];

    if (!requiredParams.every((param) => req.body.hasOwnProperty(param))) {
        return res.status(400).send({ success: false, message: "Missing required parameters" });
    }

    next();
};