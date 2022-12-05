import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../login/login-service";

export const loginThunk = createAsyncThunk (
    'onestopgo/login',
    async (loginDetails) => await service.hitLogin(loginDetails)
)

export const getUserDataThunk = createAsyncThunk (
    'onestopgo/userdata',
    async () => await service.getLoggedInUserData()
)

export const registerThunk = createAsyncThunk (
    'onestopgo/login',
    async (userDetails) => await service.registerUser(userDetails)
)