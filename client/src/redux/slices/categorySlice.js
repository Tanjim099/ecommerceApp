import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    categoryData: []
};

//GET ALL CATEGORY
export const getCategories = createAsyncThunk("category/get", async () => {
    try {
        const response = axiosInstance.get("/category/get-category");
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//CREATE CATEGORY
export const createCategory = createAsyncThunk("category/create", async (name) => {
    try {
        const response = axiosInstance.post("category/create-category", name);
        toast.promise(response, {
            loading: "Wait Creating Category",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to Create Category"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//UPDATE CATEGORY
export const updateCategory = createAsyncThunk("category/update", async (data) => {
    try {
        const response = axiosInstance.put(`/category/update-category/${data[0]}`, data[1])
        toast.promise(response, {
            loading: "Wait Updating Category",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to update category"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
//DELETE CATEGORY
export const deleteCategory = createAsyncThunk("/category/delete", async (cid) => {
    try {
        const response = axiosInstance.delete(`category/delete-category/${cid}`)
        toast.promise(response, {
            loading: "Wait deleting Category",
            success: (data) => {
                return data?.data?.response
            },
            error: "Failed to Delete Category"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categoryData = action?.payload?.category; // Directly assign the response data
            })
    }
});

export default categorySlice.reducer