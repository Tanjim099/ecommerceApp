import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import categorySlice from "./slices/categorySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categorySlice
    },
    devTools: true
});

export default store;