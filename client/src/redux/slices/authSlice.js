import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
};


export const register = createAsyncThunk("/auth/register", async (data) => {
    try {
        const response = axiosInstance.post("/auth/register", data);
        toast.promise(response, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
});

export default authSlice.reducer;