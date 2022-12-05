import {createSlice} from "@reduxjs/toolkit";
import {getUserDataThunk, loginThunk, registerThunk} from "./login-thunk";
import {logoutThunk} from "../logout/logout-thunk";


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
            return state
        },
        [logoutThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = false
            state.loggedInUser = {}
            return state
        },
        [getUserDataThunk.pending]: (state) => {
            state.loggedIn = false
        },
        [getUserDataThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = true
            state.loggedInUser = payload
            return state
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