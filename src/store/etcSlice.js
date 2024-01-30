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
        termsCheckList: [], //회원가입시 이용약관 체크박스리스트
        menuCheckList: [],
        unMenuCheckList: [],
        currentMenuId: null,
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
        termsCheckList: (state, action) => {
            state.termsCheckList = action.payload;
        },
        menuCheckList: (state, action) => {
            state.menuCheckList = action.payload;
        },
        unMenuCheckList: (state, action) => {
            state.unMenuCheckList = action.payload;
        },
        currentMenuId: (state, action) => {
            state.currentMenuId = action.payload;
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
    termsCheckList,
    menuCheckList,
    unMenuCheckList,
    currentMenuId
} = etc.actions;
export default etc;