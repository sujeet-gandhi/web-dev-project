import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from './product-service'

export const getProductsOfStoreThunk = createAsyncThunk (
    'onestopgo/getAllProductsOfStore',
    async (storeId) => await service.getAllProductsOfStore(storeId)
)

export const createProductThunk = createAsyncThunk (
    'onestopgo/createProduct',
    async (product) => await service.createProduct(product)
)
