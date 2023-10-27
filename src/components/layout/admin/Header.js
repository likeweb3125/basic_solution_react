import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { currentPage, boardMenu } from "../../../store/commonSlice";
import { confirmPop } from "../../../store/popupSlice";
import ConfirmPop from "../../popup/ConfirmPop";


const Header = () => {
    const dispatch = useDispatch();
    const board_menu_list = enum_api_uri.board_menu_list;
    const common = useSelector((state)=>state.common);
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


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


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
        getBoardMenuList();
    },[]);


    //게시판관리 - 게시글관리리스트 값 변경될때마다 게시판관리 높이값 구하기
    useEffect(()=>{
        setBoardHeight(boardRef.current.scrollHeight);
    },[boardList]);
    

    //현재페이지 메뉴 on
    useEffect(()=>{
        let page = null;

        if(Object.keys(common.currentPage).length > 0 && common.currentPage.page){
            page = common.currentPage.page;
        }
        setMenuOn(page);
    },[common.currentPage]);


    //메뉴 on 변경시 슬라이드애니메이션 
    useEffect(() => {
        console.log(menuOn);

        if(menuOn === "menu" || menuOn === "menu1") {
            menuRef.current.style.height = `${menuRef.current.scrollHeight}px`;
        }else{
            menuRef.current.style.height = "0";
        }

        if(menuOn === "board" || menuOn === "board1" || boardList.some((_, i) => menuOn === `board1_${i + 1}`) || menuOn === "board2" || menuOn === "board2_1") {
            let boardH = boardHeight;

            if(boardList.length > 0){
                if (menuOn === "board1" || boardList.some((_, i) => menuOn === `board1_${i + 1}`)) {
                    boardH = boardH + board1Ref.current.scrollHeight;
                    board1Ref.current.style.height = `${board1Ref.current.scrollHeight}px`;
                }else{
                    board1Ref.current.style.height = "0";
                }
            }
            
            if (menuOn === "board2" || menuOn === "board2_1") {
                boardH = boardH + board2Ref.current.scrollHeight;
                board2Ref.current.style.height = `${board2Ref.current.scrollHeight}px`;
            }else{
                board2Ref.current.style.height = "0";
            }

            boardRef.current.style.height = `${boardH}px`;
        }else{
            boardRef.current.style.height = "0";
        }
        
        if(menuOn === "member" || menuOn === "member1" || menuOn === "member2") {
            memberRef.current.style.height = `${memberRef.current.scrollHeight}px`;
        }else{
            memberRef.current.style.height = "0";
        }

        if(menuOn === "design" || menuOn === "design1" || menuOn === "design2") {
            designRef.current.style.height = `${designRef.current.scrollHeight}px`;
        }else{
            designRef.current.style.height = "0";
        }

        if(menuOn === "setting" || menuOn === "setting1" || menuOn === "setting2" || menuOn === "setting3") {
            settingRef.current.style.height = `${settingRef.current.scrollHeight}px`;
        }else{
            settingRef.current.style.height = "0";
        }

        if(menuOn === "stats" || menuOn === "stats1" || menuOn === "stats2") {
            statsRef.current.style.height = `${statsRef.current.scrollHeight}px`;
        }else{
            statsRef.current.style.height = "0";
        }
    }, [menuOn, boardHeight]);



    return(<>
        <header id="header" className="header">
            <div className="menu_header">
                <div className="logo_wrap">
                    <h1 className="logo" onClick={()=>{dispatch(currentPage({}))}}>
                        <a href="/console" rel="noopener noreferrer">Lorem ipsum</a>
                    </h1>
                    <span>Likeweb Company Dashboard</span>
                </div>
                <div className="menu_wrap">
                    <nav>
                        <ul className="admin_gnb">
                            <li className={menuOn && menuOn.includes("menu") ? "on" : ""}>
                                <button type="button" className="admin_menu" onClick={()=>{setMenuOn("menu")}}><span>메뉴 관리</span></button>
                                <ul className="depth2" ref={menuRef}>
                                    <li className={menuOn === "menu1" ? "on" : ""} 
                                        onClick={()=>{
                                            dispatch(currentPage({page:"menu1"}));
                                            setMenuOn("menu1");
                                        }}
                                    >
                                        <button className="menu">카테고리 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("board") ? "on" : ""}>
                                <button type="button" className="admin_board" onClick={()=>{setMenuOn("board")}}><span>게시판 관리</span></button>
                                <ul className="depth2" ref={boardRef}>
                                    {boardList.length > 0 &&
                                        // <li className={`is_depth${menuOn === "board1" ? " on" : ""}${boardList.map((_, i) => (menuOn === `board1_${i + 1}` ? ` on` : "")).join("")}`}>
                                        <li className={`is_depth${menuOn && menuOn.includes("board1") ? " on" : ""}`}>
                                            <button type="button" className="menu" onClick={()=>{setMenuOn("board1")}}>게시글 관리</button>
                                            <ul className="depth3" ref={board1Ref}>
                                                {boardList.map((cont,i)=>{
                                                    const idx = i+1;
                                                    return(
                                                        <li key={i}
                                                            className={menuOn === `board1_${idx}` ? "on" : ""} 
                                                            onClick={()=>{
                                                                dispatch(currentPage({page:`board1_${idx}`}));
                                                                setMenuOn(`board1_${idx}`);
                                                            }}
                                                        >
                                                            <span>{cont.c_name}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    }
                                    <li className={`is_depth${menuOn && menuOn.includes("board2") ? " on" :""}`}>
                                        <button type="button" className="menu" onClick={()=>{setMenuOn("board2")}}>댓글 관리</button>
                                        <ul className="depth3" ref={board2Ref}>
                                            <li className={menuOn === "board2_1" ? "on" : ""} 
                                                onClick={()=>{
                                                    dispatch(currentPage({page:"board2_1"}));
                                                    setMenuOn("board2_1");
                                                }}
                                            >
                                                <span>전체</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("member") ? "on" : ""}>
                                <button type="button" className="admin_member" onClick={()=>{setMenuOn("member")}}><span>회원 관리</span></button>
                                <ul className="depth2" ref={memberRef}>
                                    <li className={menuOn === "member1" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"member1"}))}}>
                                        <button className="menu">회원 관리</button>
                                    </li>
                                    <li className={menuOn === "member2" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"member2"}))}}>
                                        <button className="menu">관리자 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("design") ? "on" : ""}>
                                <button type="button" className="admin_design" onClick={()=>{setMenuOn("design")}}><span>디자인 관리</span></button>
                                <ul className="depth2" ref={designRef}>
                                    <li className={menuOn === "design1" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"design1"}))}}>
                                        <button className="menu">메인 배너 관리</button>
                                    </li>
                                    <li className={menuOn === "design2" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"design2"}))}}>
                                        <button className="menu">팝업 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("setting") ? "on" : ""}>
                                <button type="button" className="admin_setting" onClick={()=>{setMenuOn("setting")}}><span>환경설정</span></button>
                                <ul className="depth2" ref={settingRef}>
                                    <li className={menuOn === "setting1" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"setting1"}))}}>
                                        <button className="menu">사이트정보</button>
                                    </li>
                                    <li className={menuOn === "setting2" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"setting2"}))}}>
                                        <button className="menu">운영정책 설정</button>
                                    </li>
                                    <li className={menuOn === "setting3" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"setting3"}))}}>
                                        <button className="menu">회원 등급 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn && menuOn.includes("stats") ? "on" : ""}>
                                <button type="button" className="admin_stats" onClick={()=>{setMenuOn("stats")}}><span>통계관리</span></button>
                                <ul className="depth2" ref={statsRef}>
                                    <li className={menuOn === "stats1" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"stats1"}))}}>
                                        <button className="menu">전체 통계</button>
                                    </li>
                                    <li className={menuOn === "stats2" ? "on" : ""} onClick={()=>{dispatch(currentPage({page:"stats22"}))}}>
                                        <button className="menu">접속자 이력 통계</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <div className="help_link">
                        <a href="#" rel="noopener noreferrer">
                            <strong>유지보수 게시판</strong>
                            <b>1588-0311</b>
                        </a>
                    </div>
                </div>
            </div>
        </header>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Header;