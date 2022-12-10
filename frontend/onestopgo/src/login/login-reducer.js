import {createSlice} from "@reduxjs/toolkit";
import {getUserDataThunk, getUserSafeDetailsThunk, loginThunk, registerThunk, updateUserThunk} from "./login-thunk";
import {logoutThunk} from "../logout/logout-thunk";
import {markStoreAsFavouriteThunk} from "../store/store-thunk";


const initialState = {
    loggedIn : false,
    loggedInUser: {},
    safeDetailsUserLoading: true,
    safeDetailsUser : {}
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    extraReducers: {
        [loginThunk.pending]: (state) => {
            state.loggedIn = false
            state.loggedInUser = {}
        },
        [loginThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = true
            state.loggedInUser = payload
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
            if ("<html" in payload) {
                state.loggedIn = false
                state.loggedInUser = {}
            } else {
                state.loggedIn = true
                state.loggedInUser = payload
            }
            return state
        },
        [registerThunk.pending]: (state) => {
            state.loggedIn = false
        },
        [registerThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = false
        },
        [markStoreAsFavouriteThunk.fulfilled]: (state, {payload}) => {
            state.loggedInUser.favourites.stores.unshift(payload)
        },
        [getUserSafeDetailsThunk.fulfilled]: (state, {payload}) => {
            state.safeDetailsUserLoading = false
            state.safeDetailsUser = payload
        },
        [updateUserThunk.pending]: (state) => {
            state.loggedIn = true
        },
        [updateUserThunk.fulfilled]: (state, {payload}) => {
            state.loggedIn = true
            state.loggedInUser = payload
        }
    }
});

export default loginSlice.reducer;