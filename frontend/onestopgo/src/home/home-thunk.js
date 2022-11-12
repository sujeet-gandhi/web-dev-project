import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./home-service"


export const getHomeDataThunk = createAsyncThunk (
    'onestopgo/homeData',
    async () => await service.getHomeData()
)