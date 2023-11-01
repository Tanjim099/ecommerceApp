import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"

const initialState = {
    keyword: "",
    result: []
}

export const searchProduct = createAsyncThunk("search/product", async (query) => {
    try {
        const response = await axiosInstance.get(`/product/search/?q=${query}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
})


const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.result = action?.payload
                console.log(action)
            })
    }
})

export default searchSlice.reducer