import {createSlice} from "@reduxjs/toolkit";
import {getOrderListThunk} from "./orders-thunk";

const initialState = {
    ordersData: {},
    loading: true
}

const ordersSlice = createSlice({
    name: 'order',
    initialState: initialState,
    extraReducers: {
        [getOrderListThunk.pending]: (state) => {
            state.loading = true
            state.ordersData = {}
        },
        [getOrderListThunk.fulfilled]: (state, {payload}) => {
            state.ordersData = payload
            state.loading = false
        },
    }
    });

export default ordersSlice.reducer;