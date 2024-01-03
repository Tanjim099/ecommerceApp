import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    braintreeToken: "",
    ordersByMonthly: []
}


//GET BRAINTREE TOKEN
export const getBrainTreeToken = createAsyncThunk("/payment/getbraintoken", async () => {
    try {
        const response = await axiosInstance.get("/payment/braintree/token");
        return await response.data
    } catch (error) {
        console.log(error?.response?.data?.message)
        // toast.error(error?.response?.data?.message);
    }
})

//PAYMENT
export const payment = createAsyncThunk("/payment/payment", async (payload, thunkAPI) => {
    try {
        console.log(payload)
        // const { nonce, items } = payload;
        console.log(payload[0])
        const nonce = payload[0]
        const items = payload[1]
        console.log(nonce, items)
        const response = axiosInstance.post("/payment/braintree/payment", { nonce, items })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


//getOrdersByMonth
export const getOrdersByMonth = createAsyncThunk("/payment/get-orders/bymonth", async (data) => {
    try {
        // console.log("year", year);
        // console.log("month", months);
        const response = axiosInstance.get(`/payment/orders/${data[0]}/${data[1]}`);
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrdersByMonth.fulfilled, (state, action) => {
            console.log(action);
            state.ordersByMonthly = action?.payload?.orders;
        })
    }
})

export default paymentSlice.reducer;