import {createSlice} from "@reduxjs/toolkit";
import {cancelOrderThunk, getOrderListThunk} from "./orders-thunk";

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
        [cancelOrderThunk.fulfilled]:
            (state, {payload}) => {
                const orderIndex = state.ordersData.orders.findIndex(o => o.id === payload.orders.id)
                state.ordersData.orders[orderIndex] = payload.orders
                state.loading = false
            }
    }
    });

export default ordersSlice.reducer;