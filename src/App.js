import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Popup from './components/popup/Popup';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/layout/admin/Layout';
import AdminMain from './pages/admin/Main';
import AdminMenuCategory from './pages/admin/MenuCategory';
import AdminBoard from "./pages/admin/Board";
import AdminBoardDetail from "./pages/admin/BoardDetail";
import AdminBoardWrite from "./pages/admin/BoardWrite";

import AdminDesignPopup from "./pages/admin/DesignPopup";

import AdminSettingSiteInfo from "./pages/admin/SettingSiteInfo";
import AdminSettingPolicy from "./pages/admin/SettingPolicy";

import AdminMaint from "./pages/admin/Maint";
import AdminMaintDetail from "./pages/admin/MaintDetail";
import AdminMaintWrite from "./pages/admin/MaintWrite";

import './css/default.css';


function App() {
    const popup = useSelector((state)=>state.popup);

    //하위카테고리 설정저장시 새로고침
    useEffect(()=>{
        if(popup.adminCategoryPopModify){
            window.location.reload();
        }
    },[popup.adminCategoryPopModify]);


    return(
        <div>
            <Routes>
                {/* 사용자단---------------------------------------------- */}

                {/* //사용자단---------------------------------------------- */}



                {/* 관리자단---------------------------------------------- */}
                {/* 로그인 */}
                <Route path="/console/login" element={<AdminLogin />} />

                {/* 메인 */}
                <Route path="/console" element={<AdminLayout><AdminMain/></AdminLayout>} />

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

                {/* ---- 디자인관리 ---- */}
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
    );
}

export default App;
