import {createSlice} from "@reduxjs/toolkit";
import profile from "./data/profile.json"

const profileSlice = createSlice({
    name: "profile",
    initialState: profile,
    reducers: {
        updateProfile(state, action) {
            state = {...action.payload};
            return state
        }
    }
});

export const {updateProfile} = profileSlice.actions;
export default profileSlice.reducer;