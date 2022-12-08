import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from './cart-service'


export const getCartThunk = createAsyncThunk (
    'onestopgo/getCart',
    async () => await service.getCart()
)

export const addToCartThunk = createAsyncThunk (
    'onestopgo/addToCart',
    async (orderItemQuantity) => await service.addToCart(orderItemQuantity)
)

export const removeFromCartThunk = createAsyncThunk (
    'onestopgo/removeFromCart',
    async (orderId) => await service.removeFromCart(orderId)
)

export const updateCartThunk = createAsyncThunk (
    'onestopgo/updateCart',
    async (orderItemQuantity) => await service.updateCart(orderItemQuantity)
)

export const placeOrderThunk = createAsyncThunk (
    'onestopgo/placeOrder',
    async (orderId) => await service.placeOrder(orderId)
)
