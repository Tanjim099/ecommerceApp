import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("userData") || {}
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
});


//forgot password
export const forgotPassword = createAsyncThunk("/auth/forgotpassword", async (data) => {
    try {
        const response = axiosInstance.post("/auth/forgot-password", data);
        toast.promise(response, {
            loading: "Wait! Reset your Password",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to Reset"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data.message)
    }
})

//
export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const response = axiosInstance.get("/auth/logout");
        toast.promise(response, {
            loading: "please Wait!",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to logout"
        });
        return await response
    } catch (error) {

    }
})

//UPDATE PROFILE
export const updateProfile = createAsyncThunk("/auth/update", async (data) => {
    try {
        const response = axiosInstance.put("/auth/update-profile", data);
        toast.promise(response, {
            loading: "Wait! Updating Proflie",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to Update Profle"
        })
        return (await response).data
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
                localStorage.setItem("userData", JSON.stringify(action?.payload?.user))
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role)
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state, action) => {
                var keyIsLogin = "isLoggedIn"
                var keyRole = "role"
                var keyData = "userData"
                localStorage.removeItem(keyIsLogin)
                localStorage.removeItem(keyRole)
                localStorage.removeItem(keyData)
                state.isLoggedIn = false,
                    state.role = "";
                state.data = {}
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                localStorage.setItem("userData", JSON.stringify(action?.payload?.user))
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role)
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                localStorage.setItem("userData", JSON.stringify(action?.payload?.updatedUser))
                state.data = action?.payload?.updatedUser;
            })
    }
});

export default authSlice.reducer;