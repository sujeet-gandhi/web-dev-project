import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./user-service";

export const createUserThunk = createAsyncThunk (
    'onestopgo/createStoreAdmin',
    async (user) => await service.createStoreAdmin(user)
)