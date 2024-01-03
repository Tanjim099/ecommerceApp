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
        // toast.promise(response, {
        //     loading: "Wait! Getting All Products",
        //     success: (data) => {
        //         return data?.data?.message
        //     },
        //     error: "Failed to Get All Products"
        // })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const getAllProducts = createAsyncThunk("product/getAll", async (page) => {
    try {
        const response = await axiosInstance.get("/product/getall-products")
        // toast.promise(response, {
        //     loading: "Wait! Getting All Products",
        //     success: (data) => {
        //         return data?.data?.message
        //     },
        //     error: "Failed to Get All Products"
        // })
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

// `/api/products${categoryId ? `?categoryId=${categoryId}` : ''}`


// ===============================


//FILTER PRODUCT
// export const filtersProduct = createAsyncThunk("product/filters", async ({ checked, radio }, { rejectWithValue }) => {
//     console.log(checked, radio)
//     try {
//         // const response = axiosInstance.post("/product/filters-product", [data[0], data[1]]);
//         const response = axiosInstance.post("/product/filters-product", {
//             checked,
//             radio,
//         });
//         console.log(response)
//         // toast.promise(response, {
//         //     loading: "Wait Filtering Products",
//         //     success: (data) => {
//         //         return data?.data?.message;
//         //     },
//         //     error: "Failed to Filtered Product",
//         // });
//         return await response.data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// ===============================

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

//GET PRODUCT OR PAGINATION
// export const 

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
        console.log(error?.response?.data?.message)
        // toast.error(error?.response?.data?.message);
    }
})

//GET BRAINTREE TOKEN
// export const getBrainTreeToken = createAsyncThunk("/product/getbraintoken", async () => {
//     try {
//         const response = await axiosInstance.get("/product/braintree/token");
//         return await response.data
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

//PAYMENT
// export const payment = createAsyncThunk("/product/payment", async (payload, thunkAPI) => {
//     try {
//         console.log(payload)
//         // const { nonce, items } = payload;
//         console.log(payload[0])
//         const nonce = payload[0]
//         const items = payload[1]
//         console.log(nonce, items)
//         const response = axiosInstance.post("/product/braintree/payment", { nonce, items })
//         return (await response).data
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })
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
                console.log(action)
                state.productByCategory = action?.payload?.products
                state.category = action?.payload?.category
                console.log(state.productByCategory)
                console.log(state.category)
            })
            .addCase(filtersProduct.fulfilled, (state, action) => {
                console.log(action)
                state.productFiltersData = action?.payload?.products
            })
        // .addCase(getBrainTreeToken.fulfilled, (state, action) => {
        //     console.log(action)
        // })
    }
});

export default productSlice.reducer