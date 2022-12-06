import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from './product-service'

export const getAllProductsOfStoreAdminThunk = createAsyncThunk (
    'onestopgo/getAllProductsOfStoreAdmin',
    async () => await service.getAllProductsOfStoreAdmin()
)

export const getProductsOfStoreThunk = createAsyncThunk (
    'onestopgo/getAllProductsOfStore',
    async (storeId) => await service.getAllProductsOfStore(storeId)
)

export const getProductsOfCategoryThunk = createAsyncThunk (
    'onestopgi/getAllProductsOfACategory',
    async (categoryId) => await service.getProductsRelatedToCategory(categoryId)
)

export const createProductThunk = createAsyncThunk (
    'onestopgo/createProduct',
    async (product) => await service.createProduct(product)
)
