import {createSlice} from "@reduxjs/toolkit";
import {createStoreThunk, getStoreFromIdThunk, getStoresThunk} from "./store-thunk";

const initialState = {
    storeData: [],
    loading: true,
    singleStoreData: {},
    singleStoreDataLoading: true,
}

const storeSlice = createSlice({
    name: 'store',
    initialState: initialState,
    extraReducers: {
        [getStoresThunk.pending]: (state) => {
            state.loading = true
            state.storeData = []
        },
        [getStoresThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.storeData = payload
        },
        [createStoreThunk.pending]: (state) => {
            state.loading = true
        },
        [createStoreThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.storeData.unshift(payload)
        },
        [getStoreFromIdThunk.fulfilled]: (state, {payload}) => {
            state.singleStoreDataLoading = false
            state.singleStoreData = payload
        }
    }
})

export default storeSlice.reducer;


