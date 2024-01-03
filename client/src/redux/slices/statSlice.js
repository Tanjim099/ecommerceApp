import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    data: [],
    usersData: []
}

export const getStats = createAsyncThunk("/stat", async () => {
    try {
        const response = axiosInstance.get("/stat/admin/stats");
        return (await response).data
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
})


export const getStatUsers = createAsyncThunk("/stat/get-users", async () => {
    try {
        const response = axiosInstance.get("/stat/admin/stat/get-users");
        return (await response).data
    } catch (error) {
        toast.error(error.message)
    }
})

export const deleteUser = createAsyncThunk("/stat/delete-user", async (uId) => {
    try {
        const response = axiosInstance.delete(`/stat/admin/stat/delete/${uId}`);
        toast.promise(response, {
            success: "User Deleted Successfully",
            loading: "Please Wait !",
            error: "Failed to delete User"
        });
        return (await response).data
    } catch (error) {
        toast.error(error.message)
    }
})
const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder.addCase(getStats.fulfilled, (state, action) => {
            console.log(action)
        })
            .addCase(getStatUsers.fulfilled, (state, action) => {
                state.usersData = action?.payload?.users
            })
    }
});

export default statSlice.reducer;