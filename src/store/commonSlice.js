import { createSlice } from "@reduxjs/toolkit";

const common = createSlice({
    name: "common", //state 이름
    initialState: {
        boardMenu:[],
        boardSettingData:{},
        alarm:false,
        siteInfo:{},
        siteInfoEdit:false,
        headerMenuList:[],
        currentMenuData:{},
        userLevelList:[],
        detailPageBack: false,
        listPageData: {},
        scrollY: null,
        secretPassCheck: false,       //비밀글 비밀번호체크
    },
    reducers:{
        boardMenu: (state, action) => {
            state.boardMenu = action.payload;
        },
        boardSettingData: (state, action) => {
            state.boardSettingData = action.payload;
        },
        alarm: (state, action) => {
            state.alarm = action.payload;
        },
        siteInfo: (state, action) => {
            state.siteInfo = action.payload;
        },
        siteInfoEdit: (state, action) => {
            state.siteInfoEdit = action.payload;
        },
        headerMenuList: (state, action) => {
            state.headerMenuList = action.payload;
        },
        currentMenuData: (state, action) => {
            state.currentMenuData = action.payload;
        },
        userLevelList: (state, action) => {
            state.userLevelList = action.payload;
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
        secretPassCheck: (state, action) => {
            state.secretPassCheck = action.payload;
        },
    }
});

export const { 
    boardMenu,
    boardSettingData,
    alarm,
    siteInfo,
    siteInfoEdit,
    headerMenuList,
    currentMenuData,
    userLevelList,
    detailPageBack,
    listPageData,
    scrollY,
    secretPassCheck
} = common.actions;
export default common;