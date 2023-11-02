import slugify from "slugify";
import productModel from "../models/productModel.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises'
import path from 'path';
import categoryModel from "../models/categoryModel.js";


//CREATE PRODUCT
export const createProduct = async (req, res) => {
    const { name, description, price, category, quantity, shipping } = req.body;
    // console.log(req.body)
    if (!name || !description || !price || !category || !quantity) {
        res.status(500).send({
            message: "All Fields are required"
        })
    }
    const product = await productModel.create({
        name,
        slug: slugify(name),
        description,
        price,
        category,
        quantity,
        shipping,
        image: {
            public_id: 'DUMMY',
            secure_url: 'DUMMY'
        }
    })

    // console.log(req.file)

    if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'ecommerceApp',
        });
        // console.log(result.secure_url)

        if (result) {
            product.image.public_id = result.public_id;
            product.image.secure_url = result.secure_url;
        }
        fs.rm(`uploads/${req.file.filename}`)
    }
    await product.save();
    res.status(200).json({
        success: true,
        massage: 'Course created successfully',
        product
    })
}

//GET ALL PRODUCT
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").limit(12).sort({ createdAt: -1 });
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
        const product = await productModel.findOne({ slug: req.params.slug }).populate("category");
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
        await productModel.findByIdAndDelete(pid);
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
        console.log(name, description, price, category, quantity, shipping)

        //VALIDATION
        if (!name || !description || !price || !category || !quantity || image > 1000000) {
            res.status(500).send({
                message: "All Fields are required"
            })
        };

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (req.file) {
            await cloudinary.v2.uploader.destroy(products.image.public_id);

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'ecommerceApp',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if (result) {
                products.image.public_id = result.public_id;
                products.image.secure_url = result.secure_url;

                // remove file from local server
                fs.rm(`uploads/${req.file.filename}`);
            }
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

export const filterProduct = async (req, res) => {
    try {
        // const { checked, radio } = req.body;
        const filterData = req.body
        const checked = filterData[0]
        const radio = filterData[1]
        console.log(filterData)
        console.log(checked); // Logging received parameters
        console.log("yes");

        // if (typeof checked === "undefined" || typeof radio === "undefined") {
        //     return res.status(400).send({ success: false, message: "Missing required parameters" });
        // }

        let args = {};

        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await productModel.find(args);
        res.status(200).send({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(501).send({ success: false, message: "Error while Filtering Products", error });
    }
};

//PRODUCT COUNT
export const productCount = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while Counting product",
            error
        })
    }
}

//PRODUCT LIST BASE ON PASE
export const productList = async (req, res) => {
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).populate("category").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in per page controller",
            error
        })
    }
}


//SEARCH PRODUCT
export const searchProduct = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Please provide a search query.' });
    }

    try {
        const results = await productModel.find({
            name: { $regex: new RegExp(query, 'i') }, // Case-insensitive search
        });

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for products.' });
    }
}

//SIMILAR PRODUCTS
export const relatedProducts = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).limit(3).populate("category");
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in getting related Products",
            error
        })
    }
}

//GET PRODUCTS BY CATEGORY
export const productCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug });
        const products = await productModel.find({ category }).populate("category")
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in getting related Products",
            error
        })
    }
}