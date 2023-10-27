import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notiPop } from "../../../store/popupSlice";
import Header from "./Header";
import Footer from "./Footer";
import NotiPop from "../../popup/admin/NotiPop";

import Main from "../../../pages/admin/Main";
import MenuCategory from "../../../pages/admin/MenuCategory";
import Board from "../../../pages/admin/Board";
import BoardDetail from "../../../pages/admin/BoardDetail";
import BoardWrite from "../../../pages/admin/BoardWrite";

import SettingSiteInfo from "../../../pages/admin/SettingSiteInfo";
import SettingPolicy from "../../../pages/admin/SettingPolicy";

const Layout = (props) => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const common = useSelector((state)=>state.common);
    const user = useSelector((state)=>state.user);
    const [locationList, setLocationList] = useState([]);
    const [boardTit, setBoardTit] = useState("");


    //현재페이지에 따라 page_inner 변경
    useEffect(()=>{
        console.log(common.currentPage)
        let page = null;

        if(Object.keys(common.currentPage).length > 0 && common.currentPage.page){
            page = common.currentPage.page;
        }

        //메인
        if(page === null){
            setLocationList(["관리자 메인","전체 통계"]);
        }
        //메뉴관리 - 카테고리관리
        else if(page === "menu1"){
            setLocationList(["메뉴 관리","카테고리 관리"]);
        }
        //게시판관리 - 게시글관리 전부
        else if(page.includes("board1_")){
            let idx = page.replace("board1_","");
                idx = idx-1;
            setLocationList(["게시판 관리","게시글 관리",common.boardMenu[idx].c_name]);
            setBoardTit(common.boardMenu[idx].c_name);
        }

        //환경설정 - 사이트정보
        else if(page === "setting1"){
            setLocationList(["환경설정","사이트 정보"]);
        }
        //환경설정 - 운영정책설정
        else if(page === "setting2"){
            setLocationList(["환경설정","시스템 운영정책"]);
        }

        

    },[common.currentPage]);


    return(
        <div className="body_admin">
            <div id="wrap">
                <Header />
                <main id="main" className="main">
                    {/* 상단 */}
                    <div className="admin_location">
                        <div className="location_wrap">
                            <ul className="location">
                                {locationList.map((cont,i)=>{
                                    if (i === 0) {
                                        return <li key={i}><h2>{cont}</h2></li>
                                    } else {
                                        return <li key={i}>{cont}</li>
                                    }
                                })}
                            </ul>
                            <div className="header_util">
                                <div className="admin_util">
                                    <a href="#" rel="noopener noreferrer" className="btn_user">사용자화면 바로가기</a>
                                    {/* 알림 있을 경우 active */}
                                    <button type="button" className="btn_noti active"
                                        onClick={()=>{
                                            dispatch(notiPop(!popup.notiPop));
                                        }}
                                    >알림보기</button>
                                    {/* 알림팝업 */}
                                    {popup.notiPop && <NotiPop />}
                                </div>
                                <div className="log_util">
                                    <strong><b>{user.loginUser.m_name}</b> 님</strong>
                                    <button type="button" className="btn_logout">로그아웃</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* //상단 */}
                    <section className="admin_section">
                        <div className="page_inner">
                            {!common.currentPage.page ? <Main /> //메인페이지
                                : common.currentPage.page === "menu1" ? <MenuCategory /> //메뉴관리 - 카테고리관리
                                : common.currentPage.page.includes("board1_") && !common.currentPage.detail && !common.currentPage.write ? <Board tit={boardTit} /> //게시판관리 - 게시글관리 (모든 페이지 리스트)
                                : common.currentPage.page.includes("board1_") && common.currentPage.detail && !common.currentPage.write ? <BoardDetail tit={boardTit} /> //게시판관리 - 게시글관리 (모든 페이지 상세)
                                : common.currentPage.page.includes("board1_") && !common.currentPage.detail && common.currentPage.write ? <BoardWrite tit={boardTit} /> //게시판관리 - 게시글관리 (모든 페이지 작성or수정)


                                : common.currentPage.page === "setting1" ? <SettingSiteInfo /> //환경설정 - 사이트정보
                                : common.currentPage.page === "setting2" && <SettingPolicy /> //환경설정 - 운영정책설정
                            }      
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;