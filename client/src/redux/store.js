import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import searchSlice from "./slices/searchSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categorySlice,
        product: productSlice,
        search: searchSlice
    },
    devTools: true
});

export default store;