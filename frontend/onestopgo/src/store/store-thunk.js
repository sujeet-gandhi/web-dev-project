import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./store-service";

export const getStoresThunk = createAsyncThunk (
    'onestopgo/getallstores',
    async () => await service.getAllStores()
)

export const createStoreThunk = createAsyncThunk (
    'onestopgo/createstore',
    async (store) => await service.createStore(store)
)