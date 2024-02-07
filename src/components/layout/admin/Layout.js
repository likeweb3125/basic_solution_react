import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { adminNotiPop, confirmPop } from "../../../store/popupSlice";
import { alarm, userLevelList } from "../../../store/commonSlice";
import { loginUser, siteId, maintName } from "../../../store/userSlice";
import { checkedList, activeMenuId } from "../../../store/etcSlice";
import { enum_api_uri } from "../../../config/enum";
import * as CF from "../../../config/function";
import Header from "./Header";
import Footer from "./Footer";
import NotiPop from "../../popup/admin/NotiPop";
import ConfirmPop from "../../popup/ConfirmPop";
import { Link } from "react-router-dom";


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
    const level_list = enum_api_uri.level_list;
    const navigate = useNavigate();


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //현재페이지에 따라 page_inner 변경
    useEffect(()=>{
        const path = location.pathname;

        //페이지 변경시 store 에 저장된 checkedList 값 삭제
        dispatch(checkedList([]));

        //페이지 변경시 store 에 저장된 activeMenuId 값 삭제
        dispatch(activeMenuId(null));

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
        //게시판관리 - 댓글관리 전체
        if(path.includes("/console/comment/all")){
            setLocationList(["게시판 관리","댓글 관리","전체"]);
        }

        //회원관리 - 회원관리   
        if(path === "/console/member/user"){
            setLocationList(["회원관리","등록회원 관리"]);
        }
        //회원관리 - 관리자 관리   
        if(path === "/console/member/manager"){
            setLocationList(["회원관리","관리자 관리"]);
        }
        //회원관리 - 탈퇴회원     
        if(path === "/console/member/cancel"){
            setLocationList(["회원관리","탈퇴회원"]);
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
        //환경설정 - 회원등급 관리
        if(path === "/console/setting/level"){
            setLocationList(["환경설정","회원 등급 관리"]);
        }

        //통계관리 - 전체통계
        if(path === "/console/stats/chart"){
            setLocationList(["통계 관리","전체 통계"]);
        }
        //통계관리 - 접속자 이력 통계
        if(path === "/console/stats/visitor"){
            setLocationList(["통계 관리","접속 통계"]);
        }

        //유지보수게시판
        if(path.includes("/console/maint")){
            setLocationList(["유지보수 게시판"]);
        }
    },[location, common.boardMenu]);


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
            if(error.response.status === 401){//토큰에러시 관리자단 로그인페이지로 이동
                navigate("/console/login");
            }else{
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt: err_msg,
                    confirmPopBtn:1,
                }));
                setConfirm(true);
            }
        });
    };


    //회원등급리스트 가져오기
    const getLevelList = () => {
        axios.get(level_list,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                const list = data
                .filter((item)=>item.l_name !== null)    //미등록등급 제외
                .filter((item)=>item.l_name.length > 0)  //미등록등급 제외
                dispatch(userLevelList(list));
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


    //맨처음 알림, 회원등급리스트 가져오기
    useEffect(()=>{
        getAlarmList();
        getLevelList();
    },[]);


    //로그아웃하기
    const logoutHandler = () => {

        //로그인했을때 저장된 정보들 지우기
        dispatch(loginUser({}));
        dispatch(siteId(""));
        dispatch(maintName(""));

        //로그인 페이지이동
        navigate('/console/login');
    };


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
                                    <Link to="/" className="btn_user">사용자화면 바로가기</Link>
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
                                    <button type="button" className="btn_logout" onClick={logoutHandler}>로그아웃</button>
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
                <Footer/>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Layout;