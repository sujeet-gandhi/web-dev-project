import {createSlice} from "@reduxjs/toolkit";
import {getLoggedInUserThunk, loginThunk, registerThunk} from "./login-thunk";


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
        [registerThunk.pending]: (state) => {
            state.loggedIn = false
        },
        [registerThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = false
        },
        [getLoggedInUserThunk.pending] : (state) => {
            state.loggedIn = false
        },
        [getLoggedInUserThunk.fulfilled] : (state, {payload}) => {
            state.loggedIn = true
            state.loggedInUser = payload
        }
    }
});

export default loginSlice.reducer;