import { createSlice } from "@reduxjs/toolkit";

const popup = createSlice({
    name: "popup", //state 이름
    initialState: {
        //안내,알림 팝업
        confirmPop: false,
        confirmPopTit: "",
        confirmPopTxt: "",
        confirmPopBtn: "",

        // 관리자-------------------------------
        //알림 팝업
        adminNotiPop: false,

        //운영정책 상세 팝업
        adminPolicyPop: false,
        adminPolicyPopIdx: null,
        adminPolicyPopModify: false,
        adminPolicyPopWrite: false,

        //하위카테고리 설정팝업
        adminCategoryPop: false,
        adminCategoryPopIdx: null,
        adminCategoryPopData: {},
        adminCategoryPopAdd: false,
        adminCategoryPopModify: false,
    },
    reducers:{
        // 공통 -----------------------------------
        confirmPop: (state, action) => {
            state.confirmPop = action.payload.confirmPop;
            state.confirmPopTit = action.payload.confirmPopTit;
            state.confirmPopTxt = action.payload.confirmPopTxt;
            state.confirmPopBtn = action.payload.confirmPopBtn;
        },
        // 관리자-------------------------------
        adminNotiPop: (state, action) => {
            state.adminNotiPop = action.payload;
        },
        adminPolicyPop: (state, action) => {
            state.adminPolicyPop = action.payload.adminPolicyPop;
            state.adminPolicyPopIdx = action.payload.adminPolicyPopIdx;
        },
        adminPolicyPopModify: (state, action) => {
            state.adminPolicyPopModify = action.payload;
        },
        adminPolicyPopWrite: (state, action) => {
            state.adminPolicyPopWrite = action.payload;
        },
        adminCategoryPop: (state, action) => {
            state.adminCategoryPop = action.payload.adminCategoryPop;
            state.adminCategoryPopIdx = action.payload.adminCategoryPopIdx;
        },
        adminCategoryPopData: (state, action) => {
            state.adminCategoryPopData = action.payload;
        },
        adminCategoryPopAdd: (state, action) => {
            state.adminCategoryPopAdd = action.payload;
        },
        adminCategoryPopModify: (state, action) => {
            state.adminCategoryPopModify = action.payload;
        },
    }
});

export const {
    confirmPop, 
    adminNotiPop,
    adminPolicyPop,
    adminPolicyPopModify,
    adminPolicyPopWrite,
    adminCategoryPop,
    adminCategoryPopData,
    adminCategoryPopAdd,
    adminCategoryPopModify
} = popup.actions;
export default popup;