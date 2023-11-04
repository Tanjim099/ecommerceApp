import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    orders: [],
    allOrders: []
}

export const getOrders = createAsyncThunk("order/get", async () => {
    try {
        const response = axiosInstance.get("/order/orders")
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const getAllOrders = createAsyncThunk("order/get-all", async () => {
    try {
        const response = axiosInstance.get("/order/all-orders")
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
            .addCase(getAllOrders.fulfilled, (state, action) => {
                console.log(action)
            })
    }
})

export default orderSlice.reducer