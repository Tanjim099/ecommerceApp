import { createSlice } from '@reduxjs/toolkit';

const loadCartItems = () => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
};

const saveCartItems = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
};

const initialState = {
    items: loadCartItems(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
            saveCartItems(state.items);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            saveCartItems(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartItems(state.items);
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
