import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    orders: []
}

export const getOrders = createAsyncThunk("order/get", async () => {
    try {
        const response = axiosInstance.get("/order/get")
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action?.payload
            })
    }
})

export default orderSlice.reducer