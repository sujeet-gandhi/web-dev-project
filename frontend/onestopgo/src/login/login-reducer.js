import {createSlice} from "@reduxjs/toolkit";
import {getUserDataThunk, loginThunk, registerThunk} from "./login-thunk";


const initialState = {
    loggedIn : false,
    loggedInUser: {}
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    extraReducers: {
        [loginThunk.pending]: (state) => {
            state.loggedIn = false
        },
        [loginThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = true
        },
        [getUserDataThunk.pending]: (state) => {
            state.loggedIn = false
        },
        [getUserDataThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = true
            state.loggedInUser = payload
        },
        [registerThunk.pending]: (state) => {
            state.loggedIn = false
        },
        [registerThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = false
        },
    }
});

export default loginSlice.reducer;