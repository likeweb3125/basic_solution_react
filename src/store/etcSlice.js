import { createSlice } from "@reduxjs/toolkit";

const etc = createSlice({
    name: "etc", //state 이름
    initialState: {
        pageNo: 1,
        pageNoChange: false,
        checkedList: [],
        detailPageBack: false,
        listPageData: {},
        scrollY: null,
        closePopIdx: null,
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
        detailPageBack: (state, action) => {
            state.detailPageBack = action.payload;
        },
        listPageData: (state, action) => {
            state.listPageData = action.payload;
        },
        scrollY: (state, action) => {
            state.scrollY = action.payload;
        },
        closePopIdx: (state, action) => {
            state.closePopIdx = action.payload;
        },
    }
});

export const {
    pageNo,
    pageNoChange,
    checkedList, 
    detailPageBack,
    listPageData,
    scrollY,
    closePopIdx,
} = etc.actions;
export default etc;