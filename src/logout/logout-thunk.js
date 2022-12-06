import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../logout/logout-service";

export const logoutThunk = createAsyncThunk (
    'onestopgo/logout',
    async () => await service.hitLogout()
)


