import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { boardMenu } from "../../../store/commonSlice";
import { confirmPop } from "../../../store/popupSlice";
import ConfirmPop from "../../popup/ConfirmPop";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { board_category } = useParams();
    const { board_idx } = useParams();
    const board_menu_list = enum_api_uri.board_menu_list;
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const [menuOn, setMenuOn] = useState(null);
    const [boardHeight, setBoardHeight] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const menuRef = useRef();
    const boardRef = useRef();
    const board1Ref = useRef();
    const board2Ref = useRef();
    const memberRef = useRef();
    const designRef = useRef();
    const settingRef = useRef();
    const statsRef = useRef();
    const location = useLocation();


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //url 변경될때마다 헤더메뉴 on값 변경
    useEffect(()=>{
        const path = location.pathname;
        //메인
        if(path === "/console"){
            setMenuOn(null);
        }

        //메뉴관리
        if(path === "/console/menu/category"){
            setMenuOn("menu1");
        }

        //게시판관리
        if(path.includes("/console/board/post")){
            if(!path.includes("/detail") && board_category){
                setMenuOn(`board1_${board_category}`);
            }
            if(path.includes("/detail") && board_category && board_idx){
                setMenuOn(`board1_${board_category}`);
            }
        }
        if(path === "/console/comment/all"){
            setMenuOn("board2_1");
        }

        //회원관리  
        if(path === "/console/member/user"){
            setMenuOn("member1");
        }
        if(path === "/console/member/cancel"){
            setMenuOn("member1");
        }
        if(path === "/console/member/manager"){
            setMenuOn("member2");
        }

        //디자인관리
        if(path === "/console/design/banner"){
            setMenuOn("design1");
        }
        if(path === "/console/design/popup"){
            setMenuOn("design2");
        }

        //환경설정
        if(path === "/console/setting/site"){
            setMenuOn("setting1");
        }
        if(path === "/console/setting/policy"){
            setMenuOn("setting2");
        }

        //유지보수게시판
        if(path === "/console/maint"){
            setMenuOn("maint");
        }
    },[location.pathname]);


    //게시판관리 - 게시글관리리스트 가져오기
    const getBoardMenuList = () => {
        axios.get(`${board_menu_list}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setBoardList(data);

                //게시판관리 - 게시글관리리스트 store 에 저장
                dispatch(boardMenu(data));
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


    useEffect(()=>{
        getBoardMenuList();
    },[]);


    //게시판관리 - 게시글관리리스트 값 변경될때마다 게시판관리 높이값 구하기
    useEffect(()=>{
        setBoardHeight(boardRef.current.scrollHeight);
    },[boardList]);


    //메뉴 on 변경시 슬라이드애니메이션 
    useEffect(() => {
        if(menuOn){
            //메뉴관리
            if(menuOn === "menu" || menuOn === "menu1") {
                menuRef.current.style.height = `${menuRef.current.scrollHeight}px`;
            }else{
                menuRef.current.style.height = "0";
            }

            //게시판관리
            if(menuOn === "board" || menuOn.includes("board1") || menuOn.includes("board2")) {
                let boardH = boardHeight;

                if(boardList.length > 0){
                    if (menuOn.includes("board1")) {
                        boardH = boardH + board1Ref.current.scrollHeight;
                        board1Ref.current.style.height = `${board1Ref.current.scrollHeight}px`;
                    }else{
                        board1Ref.current.style.height = "0";
                    }
                }
                
                if (menuOn.includes("board2")) {
                    boardH = boardH + board2Ref.current.scrollHeight;
                    board2Ref.current.style.height = `${board2Ref.current.scrollHeight}px`;
                }else{
                    board2Ref.current.style.height = "0";
                }

                boardRef.current.style.height = `${boardH}px`;
            }else{
                boardRef.current.style.height = "0";
            }
            
            //회원관리
            if(menuOn === "member" || menuOn === "member1" || menuOn === "member2") {
                memberRef.current.style.height = `${memberRef.current.scrollHeight}px`;
            }else{
                memberRef.current.style.height = "0";
            }

            //디자인관리
            if(menuOn === "design" || menuOn === "design1" || menuOn === "design2") {
                designRef.current.style.height = `${designRef.current.scrollHeight}px`;
            }else{
                designRef.current.style.height = "0";
            }

            //환경설정
            if(menuOn === "setting" || menuOn === "setting1" || menuOn === "setting2" || menuOn === "setting3") {
                settingRef.current.style.height = `${settingRef.current.scrollHeight}px`;
            }else{
                settingRef.current.style.height = "0";
            }

            // if(menuOn === "stats" || menuOn === "stats1" || menuOn === "stats2") {
            //     statsRef.current.style.height = `${statsRef.current.scrollHeight}px`;
            // }else{
            //     statsRef.current.style.height = "0";
            // }
        }else{
            if(menuRef.current){
                menuRef.current.style.height = "0";
            }
            if(boardRef.current){
                boardRef.current.style.height = "0";
            }
            if(board1Ref.current){
                board1Ref.current.style.height = "0";
            }
            if(board2Ref.current){
                board2Ref.current.style.height = "0";
            }
            if(memberRef.current){
                memberRef.current.style.height = "0";
            }
            if(designRef.current){
                designRef.current.style.height = "0";
            }
            if(settingRef.current){
                settingRef.current.style.height = "0";
            }
            if(statsRef.current){
                statsRef.current.style.height = "0";
            }
        }
    }, [menuOn, boardHeight]);



    return(<>
        <header id="header" className="header">
            <div className="menu_header">
                <div className="logo_wrap">
                    <h1 className="logo">
                        <Link to="/console">관리자</Link>
                    </h1>
                    <span>{user.siteId} Company Dashboard</span>
                </div>
                <div className="menu_wrap">
                    <nav>
                        <ul className="admin_gnb">
                            <li className={menuOn && menuOn.includes("menu") ? "on" : ""}>
                                <button type="button" className="btn_menu admin_menu" onClick={()=>{setMenuOn("menu")}}><span>메뉴 관리</span></button>
                                <ul className="depth2" ref={menuRef}>
                                    <li className={menuOn === "menu1" ? "on" : ""} >
                                        <Link to="/console/menu/category" className="menu">카테고리 관리</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("board") ? "on" : ""}>
                                <button type="button" className="btn_menu admin_board" onClick={()=>{setMenuOn("board")}}><span>게시판 관리</span></button>
                                <ul className="depth2" ref={boardRef}>
                                    {boardList.length > 0 &&
                                        <li className={`is_depth${menuOn && menuOn.includes("board1") ? " on" : ""}`}>
                                            <button type="button" className="menu" onClick={()=>{setMenuOn("board1")}}>게시글 관리</button>
                                            <ul className="depth3" ref={board1Ref}>
                                                {boardList.map((cont,i)=>{
                                                    return(
                                                        <li key={i}
                                                            className={menuOn === `board1_${cont.category}` ? "on" : ""} 
                                                        >
                                                            <Link to={`/console/board/post/${cont.category}`}>{cont.c_name}</Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    }
                                    <li className={`is_depth${menuOn && menuOn.includes("board2") ? " on" :""}`}>
                                        <button type="button" className="menu" onClick={()=>{setMenuOn("board2")}}>댓글 관리</button>
                                        <ul className="depth3" ref={board2Ref}>
                                            <li className={menuOn === "board2_1" ? "on" : ""}>
                                                <Link to="/console/comment/all">전체</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("member") ? "on" : ""}>
                                <button type="button" className="btn_menu admin_member" onClick={()=>{setMenuOn("member")}}><span>회원 관리</span></button>
                                <ul className="depth2" ref={memberRef}>
                                    <li className={menuOn === "member1" ? "on" : ""}>
                                        <Link to="/console/member/user" className="menu">회원 관리</Link>
                                    </li>
                                    <li className={menuOn === "member2" ? "on" : ""}>
                                        <Link to="/console/member/manager" className="menu">관리자 관리</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("design") ? "on" : ""}>
                                <button type="button" className="btn_menu admin_design" onClick={()=>{setMenuOn("design")}}><span>디자인 관리</span></button>
                                <ul className="depth2" ref={designRef}>
                                    <li className={menuOn === "design1" ? "on" : ""}>
                                        <Link to="/console/design/banner" className="menu">메인 배너 관리</Link>
                                    </li>
                                    <li className={menuOn === "design2" ? "on" : ""}>
                                        <Link to="/console/design/popup" className="menu">팝업 관리</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("setting") ? "on" : ""}>
                                <button type="button" className="btn_menu admin_setting" onClick={()=>{setMenuOn("setting")}}><span>환경설정</span></button>
                                <ul className="depth2" ref={settingRef}>
                                    <li className={menuOn === "setting1" ? "on" : ""}>
                                        <Link to="/console/setting/site" className="menu">사이트정보</Link>
                                    </li>
                                    <li className={menuOn === "setting2" ? "on" : ""}>
                                        <Link to="/console/setting/policy" className="menu">시스템 운영정책</Link>
                                    </li>
                                    {/* <li className={menuOn === "setting3" ? "on" : ""}>
                                        <Link to="" className="menu">회원 등급 관리</Link>
                                    </li> */}
                                </ul>
                            </li>
                            {/* <li className={menuOn && menuOn.includes("stats") ? "on" : ""}>
                                <button type="button" className="btn_menu admin_stats" onClick={()=>{setMenuOn("stats")}}><span>통계관리</span></button>
                                <ul className="depth2" ref={statsRef}>
                                    <li className={menuOn === "stats1" ? "on" : ""}>
                                        <Link to="" className="menu">전체 통계</Link>
                                    </li>
                                    <li className={menuOn === "stats2" ? "on" : ""}>
                                        <Link to="" className="menu">접속자 이력 통계</Link>
                                    </li>
                                </ul>
                            </li> */}
                            <li className={menuOn && menuOn === "maint" ? "on" : ""}>
                                <Link to="/console/maint" className="btn_menu admin_maint" onClick={()=>{setMenuOn("maint")}}><span>유지보수 게시판</span></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Header;