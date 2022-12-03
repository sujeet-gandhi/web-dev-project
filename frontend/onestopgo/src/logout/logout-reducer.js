import {createSlice} from "@reduxjs/toolkit";
import {logoutThunk} from "./logout-thunk";
const initialState = {
    loginData: [],
    loading: true
}
const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    extraReducers: {
        [logoutThunk.pending]: (state) => {
            state.loading = true
            state.loginData = []
        },
        [logoutThunk.fulfilled]: (state, {payload}) => {
            state.loginData = payload
            state.loading = false
        }
    }
});

export default loginSlice.reducer;