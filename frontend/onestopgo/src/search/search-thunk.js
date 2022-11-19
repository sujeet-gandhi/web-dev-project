import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./search-service"


export const getSearchDataThunk = createAsyncThunk (
    'onestopgo/searchData',
    async () => await service.getSearchData()
)