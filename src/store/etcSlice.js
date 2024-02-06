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
        termsCheckList: [],  //회원가입시 이용약관 체크박스리스트
        menuCheckList: [],
        unMenuCheckList: [],
        cateMenuList: [],        //관리자단-메뉴관리-카테고리관리 1차카테고리 메뉴리스트
        activeMenuId: null,
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
        cateMenuList: (state, action) => {
            state.cateMenuList = action.payload;
        },
        activeMenuId: (state, action) => {
            state.activeMenuId = action.payload;
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
    cateMenuList,
    activeMenuId,
} = etc.actions;
export default etc;