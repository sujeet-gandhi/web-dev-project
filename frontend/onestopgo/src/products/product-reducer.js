import {createSlice} from "@reduxjs/toolkit";
import {createProductThunk, getProductsOfStoreThunk} from "./product-thunk";

const initialState = {
    productData: [],
    loading: true
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    extraReducers: {
        [getProductsOfStoreThunk.pending]: (state) => {
            state.loading = true
            state.productData = []
        },
        [getProductsOfStoreThunk.fulfilled]: (state, {payload}) => {
            state.productData = payload
            state.loading = false
        },
        [createProductThunk.fulfilled]: (state, {payload}) => {
            state.productData.unshift(payload)
        }
    }
    });

export default productSlice.reducer;