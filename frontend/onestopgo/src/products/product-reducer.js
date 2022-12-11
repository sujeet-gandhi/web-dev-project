import {createSlice} from "@reduxjs/toolkit";
import {
    createProductThunk,
    getAllProductsOfStoreAdminThunk, getProductFromIdThunk,
    getProductsOfCategoryThunk,
    getProductsOfStoreThunk, updateProductPriceThunk, updateProductThunk
} from "./product-thunk";

const initialState = {
    productData: [],
    productLoading: true,
    categoryProductData: [],
    categoryProductDataLoading: true,
    singleProductLoading: true,
    singleProductData: {},
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
        },
        [updateProductThunk.fulfilled]: (state, {payload}) => {
            const index = state.productData.findIndex((each) => each.product.id === payload.product.id)
            state.productData[index] = payload
            state.productLoading = false
        },
        [updateProductPriceThunk.fulfilled]: (state, {payload}) => {
            const index = state.productData.findIndex((each) => each.product.id === payload.product.id)
            state.productData[index] = payload
            state.productLoading = false
        },
        [getProductFromIdThunk.fulfilled]: (state, {payload}) => {
            state.singleProductLoading = false
            state.singleProductData = payload
        }
    }
    });

export default productSlice.reducer;