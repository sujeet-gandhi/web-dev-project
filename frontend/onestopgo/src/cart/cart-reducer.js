import {createSlice} from "@reduxjs/toolkit";
import {addToCartThunk, getCartThunk, removeFromCartThunk, updateCartThunk} from "./cart-thunk";

const initialState = {
    cartData: {},
    loading: true
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    extraReducers: {
        [getCartThunk.pending]: (state) => {
            state.loading = true
            state.cartData = {}
        },
        [getCartThunk.fulfilled]: (state, {payload}) => {
            state.cartData = payload
            state.loading = false
        },

        [addToCartThunk.pending]: (state) => {
            state.loading = true
            state.cartData = {}
        },
        [addToCartThunk.fulfilled]: (state, {payload}) => {
            state.cartData = payload
            state.loading = false
        },

        [removeFromCartThunk.pending]: (state) => {
            state.loading = true
        },
        [removeFromCartThunk.fulfilled]: (state, {payload}) => {
            state.cartData = payload
            state.loading = false
        },

        [updateCartThunk.pending]: (state) => {
            state.loading = true
            state.cartData = {}
        },
        [updateCartThunk.fulfilled]: (state, {payload}) => {
            state.cartData = payload
            state.loading = false
        }
    }
    });

export default cartSlice.reducer;