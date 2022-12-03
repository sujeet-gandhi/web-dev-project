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
                state.loading = false
                const orderIndex = state.ordersData.findIndex(o => o.id.toString() === payload.id.toString())
                state.ordersData[orderIndex] = {
                    ...state.ordersData[orderIndex],
                    ...payload
                }
            }
    }
    });

export default ordersSlice.reducer;