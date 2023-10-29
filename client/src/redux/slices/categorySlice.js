import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    categoryData: []
};

//GET ALL CATEGORY
export const getCategories = createAsyncThunk("category/get", async () => {
    try {
        const response = await axiosInstance.get("/category/get-category");

        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//CREATE CATEGORY
export const createCategory = createAsyncThunk("category/create", async (name) => {
    try {
        const response = axiosInstance.post("category/create-category", name);
        console.log(response)
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
                console.log(action)
                state.categoryData = action?.payload?.category
            })
    }
});

export default categorySlice.reducer