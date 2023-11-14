import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { adminNotiPop, confirmPop } from "../../../store/popupSlice";
import { alarm } from "../../../store/commonSlice";
import { enum_api_uri } from "../../../config/enum";
import * as CF from "../../../config/function";
import Header from "./Header";
import Footer from "./Footer";
import NotiPop from "../../popup/admin/NotiPop";
import ConfirmPop from "../../popup/ConfirmPop";


const Layout = (props) => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const common = useSelector((state)=>state.common);
    const user = useSelector((state)=>state.user);
    const [confirm, setConfirm] = useState(false);
    const [locationList, setLocationList] = useState([]);
    const location = useLocation();
    const { board_category } = useParams();
    const alarm_list = enum_api_uri.alarm_list;


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //현재페이지에 따라 page_inner 변경
    useEffect(()=>{
        const path = location.pathname;


        //메인
        if(path === "/console"){
            setLocationList(["관리자 메인","전체 통계"]);
        }
        //메뉴관리 - 카테고리관리
        if(path === "/console/menu/category"){
            setLocationList(["메뉴 관리","카테고리 관리"]);
        }
        //게시판관리 - 게시글관리 전부
        if(path.includes("/console/board/post")){
            if(board_category){
                const idx = common.boardMenu.findIndex((item)=>item.category == board_category);
                const txt = common.boardMenu[idx].c_name;
                setLocationList(["게시판 관리","게시글 관리",txt]);
            }
        }

        //디자인관리 - 팝업관리
        if(path === "/console/design/popup"){
            setLocationList(["디자인 관리","팝업 관리"]);
        }

        //환경설정 - 사이트정보
        if(path === "/console/setting/site"){
            setLocationList(["환경설정","사이트 정보"]);
        }
        //환경설정 - 운영정책설정
        if(path === "/console/setting/policy"){
            setLocationList(["환경설정","시스템 운영정책"]);
        }
    },[location.pathname, common.boardMenu]);


    //알림 가져오기
    const getAlarmList = () => {
        axios.get(`${alarm_list.replace(":follow","all")}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;

                // list 배열 중에 a_read의 첫 번째 값이 "N"인 요소가 하나라도 있는지 확인
                const hasUnread = data.list.some(item => item.a_read[0] === "N");

                if (hasUnread) {
                    // "N"이 하나라도 있는 경우
                    dispatch(alarm(true));
                } else {
                    // 모두 "N"이 아닌 경우
                    dispatch(alarm(false));
                }
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


    useEffect(()=>{
        getAlarmList();
    },[]);


    return(<>
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
                                    <button type="button" className={`btn_noti${common.alarm ? " active" : ""}`}
                                        onClick={()=>{
                                            dispatch(adminNotiPop(!popup.adminNotiPop));
                                        }}
                                    >알림보기</button>
                                    {/* 알림팝업 */}
                                    {popup.adminNotiPop && <NotiPop />}
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
                            {props.children}
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Layout;