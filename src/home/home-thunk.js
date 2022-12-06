import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./home-service"


export const getHomeDataThunk = createAsyncThunk (
    'onestopgo/homeData',
    async () => await service.getHomeData()
)

export const getSearchDataThunk = createAsyncThunk (
    'onestopgo/searchData',
    async (searchTerm) => await service.getSearchData(searchTerm)
)
