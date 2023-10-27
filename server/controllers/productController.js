import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs"

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