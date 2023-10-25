import { createSlice } from "@reduxjs/toolkit";

const common = createSlice({
    name: "common", //state 이름
    initialState: {
        currentPage:null,
        boardMenu:[],
    },
    reducers:{
        currentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        boardMenu: (state, action) => {
            state.boardMenu = action.payload;
        },
    }
});

export const { 
    currentPage,
    boardMenu,
} = common.actions;
export default common;