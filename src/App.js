import { useEffect, useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as CF from "./config/function";
import { enum_api_uri } from "./config/enum";
import { confirmPop } from "./store/popupSlice";
import {
    siteInfo,
    siteInfoEdit,
    siteLangList,
    siteLang,
} from "./store/commonSlice";
import MetaTag from "./components/component/MetaTag";
import ConfirmPop from "./components/popup/ConfirmPop";
import Layout from "./components/layout/user/Layout";
import Main from "./pages/user/Main";
import OpenPopup from "./pages/user/OpenPopup";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import ResetPasswordEmail from "./pages/user/ResetPasswordEmail";
import ResetPassword from "./pages/user/ResetPassword";
import SubWrap from "./components/component/user/SubWrap";
import Html from "./pages/user/Html";
import Custom from "./pages/user/Custom";
import CustomTest from "./pages/user/CustomTest";
import Board from "./pages/user/Board";
import BoardDetail from "./pages/user/BoardDetail";
import BoardWrite from "./pages/user/BoardWrite";
import Faq from "./pages/user/Faq";
import Inquiry from "./pages/user/Inquiry";
import InquiryWrite from "./pages/user/InquiryWrite";
import MyPage from "./pages/user/MyPage";
import MyProfile from "./components/component/user/MyProfile";
import MyInquiry from "./components/component/user/MyInquiry";
import Policy from "./pages/user/Policy";

import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/layout/admin/Layout";
import AdminMain from "./pages/admin/Main";
import AdminMenuCategory from "./pages/admin/MenuCategory";
import AdminBoard from "./pages/admin/Board";
import AdminBoardDetail from "./pages/admin/BoardDetail";
import AdminBoardWrite from "./pages/admin/BoardWrite";
import AdminCommentAll from "./pages/admin/CommentAll";
import AdminMemberUser from "./pages/admin/MemberUser";
import AdminMemberManager from "./pages/admin/MemberManager";
import AdminMemberCancel from "./pages/admin/MemberCancel";
import AdminDesignBanner from "./pages/admin/DesignBanner";
import AdminDesignPopup from "./pages/admin/DesignPopup";
import AdminSettingSiteInfo from "./pages/admin/SettingSiteInfo";
import AdminSettingPolicy from "./pages/admin/SettingPolicy";
import AdminSettingLevel from "./pages/admin/SettingLevel";
import AdminStatsChart from "./pages/admin/StatsChart";
import AdminStatsVisitor from "./pages/admin/StatsVisitor";
import AdminMaint from "./pages/admin/Maint";
import AdminMaintDetail from "./pages/admin/MaintDetail";
import AdminMaintWrite from "./pages/admin/MaintWrite";
import Popup from "./components/popup/Popup";
import "./css/default.css";

import Test from "./pages/admin/Test";

function App() {
    const dispatch = useDispatch();
    const popup = useSelector((state) => state.popup);
    const etc = useSelector((state) => state.etc);
    const common = useSelector((state) => state.common);
    const location = useLocation();
    const [confirm, setConfirm] = useState(false);
    const site_info = enum_api_uri.site_info;
    // const siteId = process.env.REACT_APP_SITE_ID;
    const siteId = "likeweb";
    const [siteInfoData, setSiteInfoData] = useState({});

    // Confirm팝업 닫힐때
    useEffect(() => {
        if (popup.confirmPop === false) {
            setConfirm(false);
        }
    }, [popup.confirmPop]);

    //페이지이동시 스크롤탑으로 이동 (상세->목록으로 뒤로가기시 제외)
    useEffect(() => {
        if (!common.detailPageBack) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    //사이트정보 가져오기
    // const getSiteInfo = () => {
    //     axios.get(`${site_info.replace(":site_id",siteId).replace(":c_lang",common.siteLang)}`)
    //     .then((res)=>{
    //         if(res.status === 200){
    //             let data = res.data.data;
    //                 data.site_id = siteId;
    //             setSiteInfoData(data);

    //             //store 에 사이트정보저장
    //             dispatch(siteInfo(data));

    //             //store 에 사이트언어 저장
    //             const lang = data.c_lang;
    //             const langList = data.c_site_lang;
    //             dispatch(siteLang(lang));
    //             dispatch(siteLangList(langList));
    //         }
    //     })
    //     .catch((error) => {
    //         const err_msg = CF.errorMsgHandler(error);
    //         dispatch(confirmPop({
    //             confirmPop:true,
    //             confirmPopTit:'알림',
    //             confirmPopTxt: err_msg,
    //             confirmPopBtn:1,
    //         }));
    //         setConfirm(true);
    //     });
    // };

    // //맨처음 사이트정보 가져오기
    // useEffect(()=>{
    //     getSiteInfo();
    // },[]);

    // //사이트정보 수정시 변경된 사이트정보 가져오기
    // useEffect(()=>{
    //     if(common.siteInfoEdit){
    //         getSiteInfo();
    //         dispatch(siteInfoEdit(false));
    //     }
    // },[common.siteInfoEdit]);

    return (
        <>
            {/* <MetaTag info={siteInfoData}/> */}
            <div>
                <Routes>
                    {/* 사용자단---------------------------------------------- */}
                    {/* 메인 */}
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Main />
                            </Layout>
                        }
                    />

                    {/* 관리자단에서 설정한 팝업 (팝업창선택) */}
                    <Route path="/openpopup/:idx" element={<OpenPopup />} />

                    {/* 로그인 */}
                    <Route
                        path="/login"
                        element={
                            <Layout>
                                <Login />
                            </Layout>
                        }
                    />

                    {/* 회원가입 */}
                    <Route
                        path="/signup"
                        element={
                            <Layout>
                                <SignUp />
                            </Layout>
                        }
                    />

                    {/* 비밀번호 재설정 - 이메일전송 */}
                    <Route
                        path="/reset_password_email"
                        element={
                            <Layout>
                                <ResetPasswordEmail />
                            </Layout>
                        }
                    />
                    {/* 비밀번호 재설정 */}
                    <Route
                        path="/reset_password"
                        element={
                            <Layout>
                                <ResetPassword />
                            </Layout>
                        }
                    />

                    {/* 마이페이지 */}
                    <Route
                        path="/mypage"
                        element={
                            <Layout>
                                <MyPage>
                                    <Outlet />
                                </MyPage>
                            </Layout>
                        }
                    >
                        {/* 회원정보수정 */}
                        <Route path="profile" element={<MyProfile />} />

                        {/* 내가작성한문의내역 */}
                        <Route path="inquiry" element={<MyInquiry />} />
                    </Route>

                    {/* 약관페이지 */}
                    <Route
                        path="/policy/:policy_idx"
                        element={
                            <Layout>
                                <Policy />
                            </Layout>
                        }
                    />

                    {/* 서브페이지 */}
                    <Route
                        path="/sub"
                        element={
                            <Layout>
                                <SubWrap>
                                    <Outlet />
                                </SubWrap>
                            </Layout>
                        }
                    >
                        {/* 카테고리종류 HTML */}
                        <Route path="html/:menu_idx" element={<Html />} />
                        {/* 카테고리종류 고객맞춤 */}
                        <Route path="custom/:menu_idx" element={<Custom />} />
                        <Route path="custom/about" element={<CustomTest />} />
                        {/* 카테고리종류 일반게시판,갤러리게시판 */}
                        <Route
                            path="board/:menu_idx"
                            element={<Board />}
                        />{" "}
                        {/* 리스트 */}
                        <Route
                            path="board/detail/:menu_idx/:board_idx"
                            element={<BoardDetail />}
                        />{" "}
                        {/* 상세 */}
                        <Route
                            path="board/write/:menu_idx"
                            element={<BoardWrite write={true} />}
                        />{" "}
                        {/* 작성 */}
                        <Route
                            path="board/modify/:menu_idx/:board_idx"
                            element={<BoardWrite />}
                        />{" "}
                        {/* 수정 */}
                        {/* 카테고리종류 FAQ */}
                        <Route path="faq/:menu_idx" element={<Faq />} />
                        {/* 카테고리종류 문의게시판 */}
                        <Route
                            path="inquiry/:menu_idx"
                            element={<Inquiry />}
                        />{" "}
                        {/* 리스트 */}
                        <Route
                            path="inquiry/write/:menu_idx"
                            element={<InquiryWrite write={true} />}
                        />{" "}
                        {/* 작성 */}
                        <Route
                            path="inquiry/modify/:menu_idx/:board_idx"
                            element={<InquiryWrite />}
                        />{" "}
                        {/* 수정 */}
                    </Route>

                    {/* //사용자단---------------------------------------------- */}

                    {/* 관리자단---------------------------------------------- */}
                    {/* 로그인 */}
                    <Route path="/console/login" element={<AdminLogin />} />

                    {/* 메인 */}
                    <Route
                        path="/console"
                        element={
                            <AdminLayout>
                                <AdminMain />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/console/test"
                        element={
                            <AdminLayout>
                                <Test />
                            </AdminLayout>
                        }
                    />
                    {/* <Route path="/console" element={<AdminLayout><Test/></AdminLayout>} /> */}

                    {/* ---- 메뉴관리 ---- */}
                    {/* 카테고리관리 */}
                    <Route
                        path="/console/menu/category"
                        element={
                            <AdminLayout>
                                <AdminMenuCategory />
                            </AdminLayout>
                        }
                    />

                    {/* ---- 게시판관리 ---- */}
                    {/* 게시글관리 */}
                    <Route
                        path="/console/board/post"
                        element={
                            <AdminLayout>
                                <Outlet />
                            </AdminLayout>
                        }
                    >
                        <Route
                            path=":board_category"
                            element={<AdminBoard />}
                        />{" "}
                        {/* 리스트 */}
                        <Route
                            path="detail/:board_category/:board_idx"
                            element={<AdminBoardDetail />}
                        />{" "}
                        {/* 상세 */}
                        <Route
                            path="write/:board_category"
                            element={<AdminBoardWrite write={true} />}
                        />{" "}
                        {/* 작성 */}
                        <Route
                            path="modify/:board_category/:board_idx"
                            element={<AdminBoardWrite />}
                        />{" "}
                        {/* 수정 */}
                    </Route>

                    {/* 댓글관리 */}
                    <Route
                        path="/console/comment/all"
                        element={
                            <AdminLayout>
                                <AdminCommentAll />
                            </AdminLayout>
                        }
                    />

                    {/* ---- 회원관리 ---- */}
                    {/* 회원관리 */}
                    <Route
                        path="/console/member/user"
                        element={
                            <AdminLayout>
                                <AdminMemberUser />
                            </AdminLayout>
                        }
                    />

                    {/* 관리자관리 */}
                    <Route
                        path="/console/member/manager"
                        element={
                            <AdminLayout>
                                <AdminMemberManager />
                            </AdminLayout>
                        }
                    />

                    {/* 탈퇴회원 */}
                    <Route
                        path="/console/member/cancel"
                        element={
                            <AdminLayout>
                                <AdminMemberCancel />
                            </AdminLayout>
                        }
                    />

                    {/* ---- 디자인관리 ---- */}
                    {/* 메인배너관리 */}
                    <Route
                        path="/console/design/banner"
                        element={
                            <AdminLayout>
                                <AdminDesignBanner />
                            </AdminLayout>
                        }
                    />

                    {/* 팝업관리 */}
                    <Route
                        path="/console/design/popup"
                        element={
                            <AdminLayout>
                                <AdminDesignPopup />
                            </AdminLayout>
                        }
                    />

                    {/* ---- 환경설정 ---- */}
                    {/* 사이트정보 */}
                    <Route
                        path="/console/setting/site"
                        element={
                            <AdminLayout>
                                <AdminSettingSiteInfo />
                            </AdminLayout>
                        }
                    />

                    {/* 운영정책 설정 */}
                    <Route
                        path="/console/setting/policy"
                        element={
                            <AdminLayout>
                                <AdminSettingPolicy />
                            </AdminLayout>
                        }
                    />

                    {/* 회원등급 관리 */}
                    <Route
                        path="/console/setting/level"
                        element={
                            <AdminLayout>
                                <AdminSettingLevel />
                            </AdminLayout>
                        }
                    />

                    {/* ---- 통계관리 ---- */}
                    {/* 전체 통계 */}
                    <Route
                        path="/console/stats/chart"
                        element={
                            <AdminLayout>
                                <AdminStatsChart />
                            </AdminLayout>
                        }
                    />

                    {/* 접속자 이력 통계 */}
                    <Route
                        path="/console/stats/visitor"
                        element={
                            <AdminLayout>
                                <AdminStatsVisitor />
                            </AdminLayout>
                        }
                    />

                    {/* ---- 유지보수 ---- */}
                    <Route
                        path="/console/maint"
                        element={
                            <AdminLayout>
                                <Outlet />
                            </AdminLayout>
                        }
                    >
                        <Route path="" element={<AdminMaint />} />{" "}
                        {/* 리스트 */}
                        <Route
                            path="detail/:list_no"
                            element={<AdminMaintDetail />}
                        />{" "}
                        {/* 상세 */}
                        <Route
                            path="write"
                            element={<AdminMaintWrite />}
                        />{" "}
                        {/* 작성 */}
                    </Route>
                    {/* //관리자단---------------------------------------------- */}
                </Routes>

                {/* 팝업 */}
                <Popup />
            </div>

            {/* confirm팝업 */}
            {confirm && <ConfirmPop />}
        </>
    );
}

export default App;
