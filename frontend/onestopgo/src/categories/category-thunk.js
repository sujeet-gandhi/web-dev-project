import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from './category-service'

export const createCategoriesThunk = createAsyncThunk (
    'onestopgo/createCategory',
    async (category) => await service.createCategory(category)
)
