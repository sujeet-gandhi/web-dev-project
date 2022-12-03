import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from './orders-service'

export const getOrderListThunk = createAsyncThunk (
    'onestopgo/getOrderList',
    async () => await service.orderList()
)

export const cancelOrderThunk = createAsyncThunk (
    'onestopgo/cancelOrder',
    async (order) => await service.cancelOrder(order.id)
)
