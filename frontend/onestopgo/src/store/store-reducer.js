import {createSlice} from "@reduxjs/toolkit";
import {getStoresThunk} from "./store-thunk";

const initialState = {
    storeData: [],
    loading: true
}

const homeSlice = createSlice({
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
        }
    }
})

export default homeSlice.reducer;


