import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    categoryData: []
};


export const getCategories = createAsyncThunk("category/get", async () => {
    try {
        const response = axiosInstance.get("/category/get-category");
        toast.promise(response, {
            loading: "Wait! getting categories",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load categories"
        })
        return (await response).data
    } catch (error) {
        toast.error(error)
    }
})

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categoryData = action?.payload.category
            })
    }
});

export default categorySlice.reducer