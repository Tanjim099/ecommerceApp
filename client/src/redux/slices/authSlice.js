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
});

//login slice
export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const response = axiosInstance.post("/auth/login", data);
        toast.promise(response, {
            loading: "Wait! login your account",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to login"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(login.fulfilled, (state, action) => {
                console.log(action)
                localStorage.setItem("userData", JSON.stringify(action?.payload?.user))
                localStorage.setItem("isLoggedIn", true);
                // localStorage.setItem("role", action?.payload?.data?.user?.role)
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                // state.role = action?.payload?.data?.user?.role;
            })
    }
});

export default authSlice.reducer;