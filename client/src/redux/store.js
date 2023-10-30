import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categorySlice,
        product: productSlice
    },
    devTools: true
});

export default store;