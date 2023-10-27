import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//CREATE CATEGORY CONTROLLER
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


//UPDATE CATEGORY CONTROLLER
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while updating category",
            error
        })
    }
}

//GET ALL CATEGORYS CONTROLLER
export const getCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Category List",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while getting category",
            error
        })
    }
}

//GET SINGLE CATEGORY BY ID
export const singleCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug });
        if (!category) { return res.send({ message: "Category is not available" }) }
        res.status(200).send({
            success: true,
            message: "Getted single category",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while getting single category",
            error
        })
    }
}

//DELETE CATGEGORY
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while deleting category",
            error
        })
    }
}