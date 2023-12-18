import { createSlice } from "@reduxjs/toolkit";

const popup = createSlice({
    name: "popup", //state 이름
    initialState: {
        //안내,알림 팝업
        confirmPop: false,
        confirmPopTit: "",
        confirmPopTxt: "",
        confirmPopBtn: "",

        // 사용자-------------------------------
        //클리어병원상세 팝업
        hospitalPop: false,
        hospitalPopData: null,

        //클리어병원 제휴문의 팝업
        inquirePop: false,


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

        //게시판분류 팝업
        adminBoardGroupPop: false,
        adminBoardGroupPopId: null,
        adminBoardGroupPopMenuOn: null,

        //팝업관리 상세 팝업
        adminPopupPop: false,
        adminPopupPopIdx: null,
        adminPopupPopType: null,
        adminPopupPopModify: false,
        adminPopupPopWrite: false,
    },
    reducers:{
        // 공통 -----------------------------------
        confirmPop: (state, action) => {
            state.confirmPop = action.payload.confirmPop;
            state.confirmPopTit = action.payload.confirmPopTit;
            state.confirmPopTxt = action.payload.confirmPopTxt;
            state.confirmPopBtn = action.payload.confirmPopBtn;
        },

        // 사용자-------------------------------
        hospitalPop: (state, action) => {
            state.hospitalPop = action.payload.hospitalPop;
            state.hospitalPopData = action.payload.hospitalPopData;
        },
        inquirePop: (state, action) => {
            state.inquirePop = action.payload;
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
        adminBoardGroupPop: (state, action) => {
            state.adminBoardGroupPop = action.payload.adminBoardGroupPop;
            state.adminBoardGroupPopId = action.payload.adminBoardGroupPopId;
        },
        adminBoardGroupPopMenuOn: (state, action) => {
            state.adminBoardGroupPopMenuOn = action.payload;
        },
        adminPopupPop: (state, action) => {
            state.adminPopupPop = action.payload.adminPopupPop;
            state.adminPopupPopIdx = action.payload.adminPopupPopIdx;
            state.adminPopupPopType = action.payload.adminPopupPopType;
        },
        adminPopupPopModify: (state, action) => {
            state.adminPopupPopModify = action.payload;
        },
        adminPopupPopWrite: (state, action) => {
            state.adminPopupPopWrite = action.payload;
        },
    }
});

export const {
    confirmPop, 

    hospitalPop,
    inquirePop,


    adminNotiPop,
    adminPolicyPop,
    adminPolicyPopModify,
    adminPolicyPopWrite,
    adminCategoryPop,
    adminCategoryPopData,
    adminCategoryPopAdd,
    adminCategoryPopModify,
    adminBoardGroupPop,
    adminBoardGroupPopMenuOn,
    adminPopupPop,
    adminPopupPopModify,
    adminPopupPopWrite,
} = popup.actions;
export default popup;