import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../login/login-service";
import {registerUser} from "../user/user-service";

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
    async (userDetails) => await registerUser(userDetails)
)

export const getUserSafeDetailsThunk = createAsyncThunk (
    'onestopgo/safedetails',
    async (userId) => await service.getSafeDataOfUserId(userId)
)