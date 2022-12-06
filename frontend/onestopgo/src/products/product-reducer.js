import {createSlice} from "@reduxjs/toolkit";
import {
    createProductThunk,
    getAllProductsOfStoreAdminThunk,
    getProductsOfCategoryThunk,
    getProductsOfStoreThunk
} from "./product-thunk";

const initialState = {
    productData: [],
    productLoading: true,
    categoryProductData: [],
    categoryProductDataLoading: true,
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    extraReducers: {
        [getProductsOfStoreThunk.pending]: (state) => {
            state.productLoading = true
            state.productData = []
        },
        [getProductsOfStoreThunk.fulfilled]: (state, {payload}) => {
            state.productData = payload
            state.productLoading = false
        },
        [getAllProductsOfStoreAdminThunk.pending]: (state) => {
            state.productLoading = true
            state.productData = []
        },
        [getAllProductsOfStoreAdminThunk.fulfilled]: (state, {payload}) => {
            state.productData = payload
            state.productLoading = false
        },
        [createProductThunk.fulfilled]: (state, {payload}) => {
            state.productData.unshift(payload)
        },
        [getProductsOfCategoryThunk.fulfilled]: (state, {payload}) => {
            state.categoryProductData = payload
            state.categoryProductDataLoading = false
        },
        [getProductsOfCategoryThunk.rejected]: (state) => {
            state.categoryProductData = []
            state.categoryProductDataLoading = true
        }
    }
    });

export default productSlice.reducer;