import { createSlice } from "@reduxjs/toolkit";

const etc = createSlice({
    name: "etc", //state 이름
    initialState: {
        pageNo:1,
        pageNoChange:false,
        checkedList: [],
    },
    reducers:{
        pageNo: (state, action) => {
            state.pageNo = action.payload;
        },
        pageNoChange: (state, action) => {
            state.pageNoChange = action.payload;
        },
        checkedList: (state, action) => {
            state.checkedList = action.payload;
        },
    }
});

export const {
    pageNo,
    pageNoChange,
    checkedList, 
} = etc.actions;
export default etc;