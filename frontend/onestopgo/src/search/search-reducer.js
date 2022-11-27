import {createSlice} from "@reduxjs/toolkit";
import {getSearchDataThunk} from "../home/home-thunk";

const initialState = {
    searchData: {},
    loading: true
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    extraReducers: {
        [getSearchDataThunk.pending]: (state) => {
            state.loading = true
            state.searchData = {}
        },
        [getSearchDataThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.searchData = payload
        }
    }
})

export default searchSlice.reducer;

