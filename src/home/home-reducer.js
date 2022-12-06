import {createSlice} from "@reduxjs/toolkit";
import {getHomeDataThunk} from "./home-thunk";
import {createCategoriesThunk} from "../categories/category-thunk";

const initialState = {
    homeData: [],
    loading: true
}

const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    extraReducers: {
        [getHomeDataThunk.pending]: (state) => {
            state.loading = true
            state.homeData = []
        },
        [getHomeDataThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.homeData = payload
        },
        [createCategoriesThunk.fulfilled]: (state, {payload}) => {
            state.homeData.categories.unshift(payload)
        }
    }
})

export default homeSlice.reducer;

