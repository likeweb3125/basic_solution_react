import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user", //state 이름
    initialState: {
        // currentPage:null,
    },
    reducers:{
        // currentPage: (state, action) => {
        //     state.currentPage = action.payload;
        // },
    },
});

export const {  } = user.actions;
export default user;