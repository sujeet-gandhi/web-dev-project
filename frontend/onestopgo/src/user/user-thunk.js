import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./user-service";

export const createUserThunk = createAsyncThunk (
    'onestopgo/createUser',
    async (user) => await service.createUser(user)
)