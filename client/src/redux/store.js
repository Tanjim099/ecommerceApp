import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import searchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categorySlice,
        product: productSlice,
        search: searchSlice,
        cart: cartSlice
    },
    devTools: true
});

export default store;