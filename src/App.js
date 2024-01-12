import { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import * as CF from "./config/function";
import { enum_api_uri } from './config/enum';
import { confirmPop } from './store/popupSlice';
import { siteInfo, siteInfoEdit } from './store/commonSlice';
import MetaTag from './components/component/MetaTag';
import ConfirmPop from './components/popup/ConfirmPop';
import Layout from './components/layout/user/Layout';
import Main from "./pages/user/Main";
import OpenPopup from './pages/user/OpenPopup';
import Clearlasik from './pages/user/Clearlasik';
import Ziemer from './pages/user/Ziemer';
import News from './pages/user/News';
import Paper from './pages/user/Paper';
import BoardDetail from './pages/user/BoardDetail';
import Hospital from './pages/user/Hospital';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/layout/admin/Layout';
import AdminMain from './pages/admin/Main';
import AdminMenuCategory from './pages/admin/MenuCategory';
import AdminBoard from "./pages/admin/Board";
import AdminBoardDetail from "./pages/admin/BoardDetail";
import AdminBoardWrite from "./pages/admin/BoardWrite";
import AdminCommentAll from "./pages/admin/CommentAll";
import AdminDesignBanner from "./pages/admin/DesignBanner";
import AdminDesignPopup from "./pages/admin/DesignPopup";
import AdminSettingSiteInfo from "./pages/admin/SettingSiteInfo";
import AdminSettingPolicy from "./pages/admin/SettingPolicy";
import AdminMaint from "./pages/admin/Maint";
import AdminMaintDetail from "./pages/admin/MaintDetail";
import AdminMaintWrite from "./pages/admin/MaintWrite";
import Popup from './components/popup/Popup';
import './css/default.css';
import bg_magazine1 from "./images/user_images/bg_magazine1.png";
import bg_magazine2 from "./images/user_images/bg_magazine2.png";

import Test from './pages/admin/Test';





function App() {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const etc = useSelector((state)=>state.etc);
    const common = useSelector((state)=>state.common);
    const location = useLocation();
    const [confirm, setConfirm] = useState(false);
    const site_info = enum_api_uri.site_info;
    // const siteId = process.env.REACT_APP_SITE_ID;
    const siteId = 'likeweb';
    const [siteInfoData, setSiteInfoData] = useState({});
    


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);

    
    //페이지이동시 스크롤탑으로 이동 (상세->목록으로 뒤로가기시 제외)
    useEffect(()=>{
        if(!etc.detailPageBack){
            window.scrollTo(0,0);
        }
    },[location]);


    //관리자단 하위카테고리 설정저장시 새로고침
    useEffect(()=>{
        if(popup.adminCategoryPopModify){
            window.location.reload();
        }
    },[popup.adminCategoryPopModify]);


    //사이트정보 가져오기
    const getSiteInfo = () => {
        axios.get(`${site_info.replace(":site_id",siteId)}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                    data.site_id = siteId;
                setSiteInfoData(data);
                dispatch(siteInfo(data));
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: err_msg,
                confirmPopBtn:1,
            }));
            setConfirm(true);
        });
    };


    //맨처음 사이트정보 가져오기
    useEffect(()=>{
        getSiteInfo();
    },[]);


    //사이트정보 수정시 변경된 사이트정보 가져오기
    useEffect(()=>{
        if(common.siteInfoEdit){
            getSiteInfo();
            dispatch(siteInfoEdit(false));
        }
    },[common.siteInfoEdit]);


    


    return(<>
        {/* <MetaTag info={siteInfoData}/> */}
        <div>
            <Routes>
                {/* 사용자단---------------------------------------------- */}
                {/* 메인 */}
                <Route path="/" element={<Layout main={true}><Main /></Layout>} />

                {/* 관리자단에서 설정한 팝업 (팝업창선택) */}
                <Route path="/openpopup/:idx" element={<OpenPopup />} />

                {/* 클리어라식 */}
                <Route path="/clearlasik" element={<Layout><Clearlasik /></Layout>} />

                {/* 지머 */}
                <Route path="/ziemer" element={<Layout><Ziemer /></Layout>} />

                {/* 매거진 - 뉴스 */}
                <Route path="/news" element={<Layout board={true} boardTopData={{loca:"뉴스",txt:["지머의 다양한 소식을","먼저 만나 보세요."],img:bg_magazine2}}><News/></Layout>}/>
                {/* 매거진 - 뉴스 상세 */}
                <Route path="/news/:board_category/:board_idx" element={<Layout><BoardDetail /></Layout>} />

                {/* 매거진 - 논문 */}
                <Route path="/paper" element={<Layout board={true} boardTopData={{loca:"논문",txt:["기술혁신을 통해 놀라운 변화를 추구하는","클리어 특허 논문을 확인하세요."],img:bg_magazine1}}><Paper/></Layout>}/>

                {/* 클리어병원찾기 */}
                <Route path="/hospital" element={<Layout><Hospital /></Layout>} />
                {/* //사용자단---------------------------------------------- */}



                {/* 관리자단---------------------------------------------- */}
                {/* 로그인 */}
                <Route path="/console/login" element={<AdminLogin />} />


                {/* 메인 */}
                <Route path="/console" element={<AdminLayout><AdminMain/></AdminLayout>} />
                {/* <Route path="/console" element={<AdminLayout><Test/></AdminLayout>} /> */}


                {/* ---- 메뉴관리 ---- */}
                {/* 카테고리관리 */}
                <Route path="/console/menu/category" element={<AdminLayout><AdminMenuCategory/></AdminLayout>} />


                {/* ---- 게시판관리 ---- */}
                {/* 게시글관리 */}
                <Route path="/console/board/post" element={<AdminLayout><Outlet/></AdminLayout>}>
                    <Route path=":board_category" element={<AdminBoard/>} />                            {/* 리스트 */}
                    <Route path="detail/:board_category/:board_idx" element={<AdminBoardDetail/>} />    {/* 상세 */}
                    <Route path="write/:board_category" element={<AdminBoardWrite write={true} />} />   {/* 작성 */}
                    <Route path="modify/:board_category/:board_idx" element={<AdminBoardWrite/>} />     {/* 수정 */}
                </Route>

                {/* 댓글관리 */}
                <Route path="/console/comment/all" element={<AdminLayout><AdminCommentAll/></AdminLayout>} />


                {/* ---- 회원관리 ---- */}
                {/* 회원관리 */}
                <Route path="/console/member/user" element={<AdminLayout><AdminDesignBanner/></AdminLayout>} />

                {/* 관리자관리 */}
                <Route path="/console/member/manager" element={<AdminLayout><AdminDesignBanner/></AdminLayout>} />

                {/* 탈퇴회원 */}
                <Route path="/console/member/cancel" element={<AdminLayout><AdminDesignBanner/></AdminLayout>} />


                {/* ---- 디자인관리 ---- */}
                {/* 메인배너관리 */}
                <Route path="/console/design/banner" element={<AdminLayout><AdminDesignBanner/></AdminLayout>} />

                {/* 팝업관리 */}
                <Route path="/console/design/popup" element={<AdminLayout><AdminDesignPopup/></AdminLayout>} />
                

                {/* ---- 환경설정 ---- */}
                {/* 사이트정보 */}
                <Route path="/console/setting/site" element={<AdminLayout><AdminSettingSiteInfo/></AdminLayout>} />

                {/* 운영정책 설정 */}
                <Route path="/console/setting/policy" element={<AdminLayout><AdminSettingPolicy/></AdminLayout>} />


                {/* ---- 유지보수 ---- */}
                <Route path="/console/maint" element={<AdminLayout><Outlet/></AdminLayout>}>
                    <Route path="" element={<AdminMaint/>}/>                                        {/* 리스트 */}
                    <Route path="detail/:list_no" element={<AdminMaintDetail/>} />                  {/* 상세 */}
                    <Route path="write" element={<AdminMaintWrite/>} />                             {/* 작성 */}
                </Route>
                {/* //관리자단---------------------------------------------- */}

            </Routes>

            {/* 팝업 */}
            <Popup />
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
}

export default App;
