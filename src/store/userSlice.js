import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user", //state 이름
    initialState: {
        loginUser: "",
        siteId: "",
    },
    reducers:{
        loginUser: (state, action) => {
            state.loginUser = action.payload;
        },
        siteId: (state, action) => {
            state.siteId = action.payload;
        },
    },
});

export const { loginUser, siteId } = user.actions;
export default user;