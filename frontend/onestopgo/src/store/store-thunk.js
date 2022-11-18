import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./store-service";

export const getStoresThunk = createAsyncThunk (
    'onestopgo/store',
    async () => await service.getAllStores()
)