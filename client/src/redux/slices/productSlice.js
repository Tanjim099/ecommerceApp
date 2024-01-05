import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
    productList: [],
    total: 0,
    productByCategory: [],
    productFiltersData: [],
    category: [],
    braintreeToken: ""
}

//CREATE PRODUCT
export const createProduct = createAsyncThunk("product/create", async (data) => {
    try {
        const response = axiosInstance.post("/product/create-product", data)
        toast.promise(response, {
            loading: "Wait! Creating Product",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to Create Product"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


//GET ALL PRODUCTS
export const getProductsByPage = createAsyncThunk("product/get-productlist", async (page) => {
    try {
        const response = await axiosInstance.get(`/product/product-list/${page}`)
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const getAllProducts = createAsyncThunk("product/getAll", async (page) => {
    try {
        const response = await axiosInstance.get("/product/getall-products")
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//UPDATE PRODUCT
export const updateProduct = createAsyncThunk("product/update", async (data) => {
    try {
        const response = axiosInstance.put(`/product/update-product/${data[0]}`, data[1])
        toast.promise(response, {
            loading: "Wait! Updating Product data",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to update product data"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//DELETE PRODUCT
export const deleteProduct = createAsyncThunk("product/delete", async (pid) => {
    try {
        const response = axiosInstance.delete(`/product/delete-product/${pid}`)
        toast.promise(response, {
            loading: "Wait Deleting Product",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to Delete Product"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
});

export const filtersProduct = createAsyncThunk("product/filters", async (categoryIds, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get(`/product/filters-product?categoryIds=${categoryIds.join(",")}`);
        return (await response).data
    } catch (error) {

    }
});

//PRODUCT COUNT
export const productCount = createAsyncThunk("product/count", async () => {
    try {
        const response = axiosInstance.get("/product/product-count")
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


//SIMILAR PRODUCT
export const relatedProducts = createAsyncThunk("product/related", async (data) => {
    try {
        const response = axiosInstance.get(`/product/related-product/${data[0]}/${data[1]}`)
        return (await response).data
    } catch (error) {
        console.log(error?.response?.data?.message)
        // toast.error(error?.response?.data?.message);
    }
})


//GET PRODUCT BY CATEGORY
export const getProductByCategory = createAsyncThunk("product/bycategory", async (slug) => {
    try {
        const response = await axiosInstance.get(`/product/product-category/${slug}`);
        return (await response).data
    } catch (error) {
    }
})


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.productList = action?.payload?.products
            })
            .addCase(productCount.fulfilled, (state, action) => {
                state.total = action?.payload?.total
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.productByCategory = action?.payload?.products
                state.category = action?.payload?.category
            })
            .addCase(filtersProduct.fulfilled, (state, action) => {
                state.productFiltersData = action?.payload?.products
            })
    }
});

export default productSlice.reducer