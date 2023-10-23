import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPage, boardMenu } from "../../../store/commonSlice";


const Header = () => {
    const dispatch = useDispatch();
    const common = useSelector((state)=>state.common);
    const [menuOn, setMenuOn] = useState(null);
    const [boardHeight, setBoardHeight] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const menuRef = useRef();
    const boardRef = useRef();
    const board1Ref = useRef();
    const board2Ref = useRef();
    const memberRef = useRef();
    const designRef = useRef();
    const settingRef = useRef();
    const statsRef = useRef();




    useEffect(()=>{
        //게시판관리 - 게시글관리리스트 가져오기
        const list = ["공지사항","자유 게시판","1:1문의","FAQ","갤러리 게시판"];
        // const list = [];
        setBoardList(list);

        //게시판관리 - 게시글관리리스트 store 에 저장
        dispatch(boardMenu(list));
    },[]);


    //게시판관리 - 게시글관리리스트 값 변경될때마다 게시판관리 높이값 구하기
    useEffect(()=>{
        setBoardHeight(boardRef.current.scrollHeight);
    },[boardList]);
    

    //현재페이지 메뉴 on
    useEffect(()=>{
        setMenuOn(common.currentPage);
    },[common.currentPage]);


    //메뉴 on 변경시 슬라이드애니메이션 
    useEffect(() => {
        // console.log(menuOn);

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



    return(
        <header id="header" className="header">
            <div className="menu_header">
                <div className="logo_wrap">
                    <h1 className="logo" onClick={()=>{dispatch(currentPage(null))}}>
                        <a href="/console" rel="noopener noreferrer">Lorem ipsum</a>
                    </h1>
                    <span>Likeweb Company Dashboard</span>
                </div>
                <div className="menu_wrap">
                    <nav>
                        <ul className="admin_gnb">
                            <li className={menuOn === "menu" || menuOn === "menu1" ? "on" : ""}>
                                <button type="button" className="admin_menu" onClick={()=>{setMenuOn("menu")}}><span>메뉴 관리</span></button>
                                <ul className="depth2" ref={menuRef}>
                                    <li className={menuOn === "menu1" ? "on" : ""} 
                                        onClick={()=>{
                                            dispatch(currentPage("menu1"));
                                            setMenuOn("menu1");
                                        }}
                                    >
                                        <button className="menu">카테고리 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={`${menuOn === "board" || menuOn === "board1" || menuOn === "board2" || menuOn === "board2_1" ? "on" : ""}${boardList.map((_, i) => (menuOn === `board1_${i + 1}` ? `on` : "")).join("")}`}>
                                <button type="button" className="admin_board" onClick={()=>{setMenuOn("board")}}><span>게시판 관리</span></button>
                                <ul className="depth2" ref={boardRef}>
                                    {boardList.length > 0 &&
                                        <li className={`is_depth${menuOn === "board1" ? " on" : ""}${boardList.map((_, i) => (menuOn === `board1_${i + 1}` ? ` on` : "")).join("")}`}>
                                            <button type="button" className="menu" onClick={()=>{setMenuOn("board1")}}>게시글 관리</button>
                                            <ul className="depth3" ref={board1Ref}>
                                                {boardList.map((cont,i)=>{
                                                    const idx = i+1;
                                                    return(
                                                        <li key={i}
                                                            className={menuOn === `board1_${idx}` ? "on" : ""} 
                                                            onClick={()=>{
                                                                dispatch(currentPage(`board1_${idx}`));
                                                                setMenuOn(`board1_${idx}`);
                                                            }}
                                                        >
                                                            <span>{cont}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    }
                                    <li className={`is_depth${menuOn === "board2" || menuOn === "board2_1" ? " on" :""}`}>
                                        <button type="button" className="menu" onClick={()=>{setMenuOn("board2")}}>댓글 관리</button>
                                        <ul className="depth3" ref={board2Ref}>
                                            <li className={menuOn === "board2_1" ? "on" : ""} 
                                                onClick={()=>{
                                                    dispatch(currentPage("board2_1"));
                                                    setMenuOn("board2_1");
                                                }}
                                            >
                                                <span>전체</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn === "member" || menuOn === "member1" || menuOn === "member2" ? "on" : ""}>
                                <button type="button" className="admin_member" onClick={()=>{setMenuOn("member")}}><span>회원 관리</span></button>
                                <ul className="depth2" ref={memberRef}>
                                    <li className={menuOn === "member1" ? "on" : ""} onClick={()=>{dispatch(currentPage("member1"))}}>
                                        <button className="menu">회원 관리</button>
                                    </li>
                                    <li className={menuOn === "member2" ? "on" : ""} onClick={()=>{dispatch(currentPage("member2"))}}>
                                        <button className="menu">관리자 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn === "design" || menuOn === "design1" || menuOn === "design2" ? "on" : ""}>
                                <button type="button" className="admin_design" onClick={()=>{setMenuOn("design")}}><span>디자인 관리</span></button>
                                <ul className="depth2" ref={designRef}>
                                    <li className={menuOn === "design1" ? "on" : ""} onClick={()=>{dispatch(currentPage("design1"))}}>
                                        <button className="menu">메인 배너 관리</button>
                                    </li>
                                    <li className={menuOn === "design2" ? "on" : ""} onClick={()=>{dispatch(currentPage("design2"))}}>
                                        <button className="menu">팝업 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn === "setting" || menuOn === "setting1" || menuOn === "setting2" || menuOn === "setting3" ? "on" : ""}>
                                <button type="button" className="admin_setting" onClick={()=>{setMenuOn("setting")}}><span>환경설정</span></button>
                                <ul className="depth2" ref={settingRef}>
                                    <li className={menuOn === "setting1" ? "on" : ""} onClick={()=>{dispatch(currentPage("setting1"))}}>
                                        <button className="menu">사이트정보</button>
                                    </li>
                                    <li className={menuOn === "setting2" ? "on" : ""} onClick={()=>{dispatch(currentPage("setting2"))}}>
                                        <button className="menu">운영정책 설정</button>
                                    </li>
                                    <li className={menuOn === "setting3" ? "on" : ""} onClick={()=>{dispatch(currentPage("setting3"))}}>
                                        <button className="menu">회원 등급 관리</button>
                                    </li>
                                </ul>
                            </li>
                            <li className={menuOn === "stats" || menuOn === "stats1" || menuOn === "stats2" ? "on" : ""}>
                                <button type="button" className="admin_stats" onClick={()=>{setMenuOn("stats")}}><span>통계관리</span></button>
                                <ul className="depth2" ref={statsRef}>
                                    <li className={menuOn === "stats1" ? "on" : ""} onClick={()=>{dispatch(currentPage("stats1"))}}>
                                        <button className="menu">전체 통계</button>
                                    </li>
                                    <li className={menuOn === "stats2" ? "on" : ""} onClick={()=>{dispatch(currentPage("stats2"))}}>
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
    );
};

export default Header;