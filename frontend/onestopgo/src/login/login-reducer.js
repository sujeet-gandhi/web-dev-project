import {createSlice} from "@reduxjs/toolkit";
import {loginThunk} from "./login-thunk";


const initialState = {
    loginData: [],
    loading: true
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    extraReducers: {
        [loginThunk.pending]: (state) => {
            state.loading = true
            state.loginData = []
        },
        [loginThunk.fulfilled]: (state, {payload}) => {
            state.loginData = payload
            state.loading = false
        },
    }
});

export default loginSlice.reducer;