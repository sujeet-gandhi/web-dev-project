import {createSlice} from "@reduxjs/toolkit";
import {getHomeDataThunk} from "./home-thunk";

const initialState = {
    homeData: [],
    loading: true
}

const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    extraReducers: {
        [getHomeDataThunk.pending]: (state) => {
            console.log("HI");
            state.loading = true
            state.homeData = []
        },
        [getHomeDataThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.homeData = payload
        }
    }
})

export default homeSlice.reducer;

