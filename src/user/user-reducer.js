import {createSlice} from "@reduxjs/toolkit";
import {createUserThunk} from "./user-thunk";

const initialState = {
    userData: [],
    loading: true
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    extraReducers: {
        [createUserThunk.pending]: (state) => {
            state.loading = true
        },
        [createUserThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.userData.unshift(payload)
        }
    }
})

export default userSlice.reducer;


