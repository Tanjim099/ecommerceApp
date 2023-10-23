import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validation
        if (!name || !email || !password || !phone || !address) {
            return res.send({ error: "All fields are requred" })
        }

        //check user
        const exisitingUser = await userModel.findOne({ email });

        //exisiting user
        if (exisitingUser) {
            res.status(500).send({
                success: true,
                message: "Already Register please login",
            })
        }

        //register user

        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save()
        res.status(200).send({
            success: true,
            message: "User Register Successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registeration",
            error
        })
    }
}