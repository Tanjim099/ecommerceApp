import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs"


//CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        //VALIDATION
        if (!name || !description || !price || !category || !quantity || !image || image > 1000000) {
            res.status(500).send({
                message: "All Fields are required"
            })
        };

        const products = await new productModel({ ...req.fields, slug: slugify(name) });
        if (image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }
        await products.save();
        res.status(200).send({
            success: true,
            message: "Product Created Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while creating product",
            error
        })
    }
}

//GET ALL PRODUCT
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-image").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All Products",
            totalCount: products.length,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while getting all products",
            error
        })
    }
}

//GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-image").populate("category");
        res.status(200).send({
            success: true,
            message: "get Product",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while getting product",
            error
        })
    }
}


//PRODUCT IMAGE
export const productImage = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid).select("image");
        if (product.image.data) {
            res.set("Content-type", product.image.contentType)
            return res.status(200).send(product.image.data)
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while getting product image",
            error
        })
    }
}

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        await productModel.findByIdAndDelete(pid).select("-image");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while deleting product image",
            error
        })
    }
}

//UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;
        const { pid } = req.params;

        //VALIDATION
        if (!name || !description || !price || !category || !quantity || !image || image > 1000000) {
            res.status(500).send({
                message: "All Fields are required"
            })
        };

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }
        await products.save();
        res.status(200).send({
            success: true,
            message: "Product Updated Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while Updating product",
            error
        })
    }
}