import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Category Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(401).send({
                success: false,
                message: "Category Name is required"
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}