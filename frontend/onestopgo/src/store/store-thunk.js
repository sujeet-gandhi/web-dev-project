import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./store-service";
import {store} from "browser-router/html5-history";

export const getStoresThunk = createAsyncThunk (
    'onestopgo/getallstores',
    async () => await service.getAllStores()
)

export const createStoreThunk = createAsyncThunk (
    'onestopgo/createstore',
    async (store) => await service.createStore(store)
)

export const markStoreAsFavouriteThunk = createAsyncThunk(
    'onestopgo/markstorefavourite',
    async (storeId) => await service.markStoreAsFavourite(storeId)
)

export const getStoreFromIdThunk = createAsyncThunk(
    'onestopgo/getStoreFromId',
    async (storeId) => await service.getStoreFromId(storeId)
)

export const getUsersWhoLikeStoreThunk = createAsyncThunk (
    'onestopgo/userswholikestore',
    async (storeId) => await service.getUsersWhoLikeStore(storeId)
)