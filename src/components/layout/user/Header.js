import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { confirmPop } from "../../../store/popupSlice";
import { headerMenuList } from "../../../store/commonSlice";
import { loginStatus, loginUser, siteId, maintName } from "../../../store/userSlice";
import ConfirmPop from "../../popup/ConfirmPop";
import logo from "../../../images/logo.png";


const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const popup = useSelector((state)=>state.popup);
    const common = useSelector((state)=>state.common);
    const user = useSelector((state)=>state.user);
    const menu_list = enum_api_uri.menu_list;
    const [confirm, setConfirm] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoMenuOpen, setIsMoMenuOpen] = useState(false);
    const [siteInfo, setSiteInfo] = useState({});
    const [menuList, setMenuList] = useState([]);
    const [menuOn, setMenuOn] = useState(null);
    const [menu2On, setMenu2On] = useState({});
    const [login, setLogin] = useState(false);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    useEffect(()=>{
        setSiteInfo(common.siteInfo);
    },[common.siteInfo]);


    //헤더메뉴 토글
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    //모바일헤더메뉴 토글
    const toggleMoMenu = () => {
        setIsMoMenuOpen(!isMoMenuOpen);
    };

    //페이지이동시 메뉴닫기
    useEffect(()=>{
        setIsMenuOpen(false);
        setIsMoMenuOpen(false);
    },[location]);


    // 전체메뉴 가져오기
    const getMenuList = () => {
        axios.get(menu_list)
        .then((res)=>{
            if(res.status === 200){
                const data = res.data.data;
                const list = data.filter(item => item.id != 0);
                setMenuList(list);
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


    //맨처음 전체메뉴 가져오기
    useEffect(()=>{
        getMenuList();
    },[]);


    //전체메뉴값 변경시 store에 저장
    useEffect(()=>{
        dispatch(headerMenuList(menuList));
    },[menuList]);


    //로그인인지 체크
    useEffect(()=>{
        if(user.loginStatus){
            setLogin(true);
        }else{
            setLogin(false);
        }
    },[user.loginStatus]);


    //메뉴 클릭시
    const menuClickHandler = (depth, data) => {
        console.log(data);

        let url;

        //1차메뉴일때
        if(depth === 1){
            //하위메뉴가 빈메뉴아닐때
            if(data.submenu && data.submenu[0].c_content_type[0] !== 2){
                const type = data.submenu[0].c_content_type[0];
                //카테고리종류 HTML 일때
                if(type === 1){
                    url = '/sub/html/'+data.submenu[0].id;
                }
                //카테고리종류 빈메뉴 일때
                if(type === 2){

                }
                //카테고리종류 고객맞춤 일때
                if(type === 3){

                }
                //카테고리종류 일반게시판 or 갤러리게시판 일때
                if(type === 4 || type === 5){
                    url = '/sub/board/'+data.submenu[0].id;
                }
                //카테고리종류 FAQ 일때
                if(type === 6){
                    url = '/sub/faq/'+data.submenu[0].id;
                }
                //카테고리종류 문의게시판 일때
                if(type === 7){
                    url = '/sub/inquiry/'+data.submenu[0].id;
                }
                navigate(url);
            }
        }

        //2차메뉴일때
        if(depth === 2){
            //하위메뉴가 빈메뉴아닐때
            if(data.c_content_type[0] !== 2){
                const type = data.c_content_type[0];
                //카테고리종류 HTML 일때
                if(type === 1){
                    url = '/sub/html/'+data.id;
                }
                //카테고리종류 빈메뉴 일때
                if(type === 2){

                }
                //카테고리종류 고객맞춤 일때
                if(type === 3){

                }
                //카테고리종류 일반게시판 or 갤러리게시판 일때
                if(type === 4 || type === 5){
                    url = '/sub/board/'+data.id;
                }
                //카테고리종류 FAQ 일때
                if(type === 6){
                    url = '/sub/faq/'+data.id;
                }
                //카테고리종류 문의게시판 일때
                if(type === 7){
                    url = '/sub/inquiry/'+data.id;
                }
                navigate(url);
            }
        }
    };


    //depth2 메뉴클릭시
    const menu2ClickHandler = (idx) => {
        let newMenuOn = {...menu2On};
        newMenuOn[idx] = !newMenuOn[idx];
        setMenu2On(newMenuOn);
    };


    //로그아웃하기
    const logoutHandler = () => {

        //로그인했을때 저장된 정보들 지우기
        dispatch(loginStatus(false));
        dispatch(loginUser({}));
        dispatch(siteId(""));
        dispatch(maintName(""));

        //메인 페이지이동
        navigate('/');
    };


    return(<>
        <header id="header" className="header">
            <div className="header_inner">
                <h1 className="logo">
                    <Link to="/">
                        <img src={logo} alt="로고"/>
                    </Link>
                </h1>
                <div className="menu_wrap">
                    <nav>
                        <ul className="gnb">
                            {menuList.map((cont,i)=>{
                                return(
                                    <li key={i}
                                        onMouseEnter={()=>setMenuOn(i)}
                                        onMouseLeave={()=>setMenuOn(null)}
                                    >
                                        <button type="button"
                                            onClick={()=>{menuClickHandler(1, cont)}}
                                        >
                                            <span>{cont.c_name}</span>
                                        </button>
                                        {cont.submenu && 
                                            <ul className={`depth2${menuOn === i ? ' on' : ''}`}>
                                                {cont.submenu.map((cont2,idx)=>{
                                                    return(
                                                        <li key={idx} 
                                                            className={`${cont2.submenu ? 'is_depth' : ''}${menu2On[idx] ? ' on' : ''}`} 
                                                            onClick={()=>menu2ClickHandler(idx)}
                                                        >
                                                            {/* <Link to={`/board/${cont2.id}`}> */}
                                                            <button type="button"
                                                                onClick={()=>{menuClickHandler(2, cont2)}}
                                                            >
                                                                <span>{cont2.c_name}</span>
                                                            </button>
                                                            {cont2.submenu &&
                                                                <ul className="depth3">
                                                                    {cont2.submenu.map((cont3, index)=>{
                                                                        return(
                                                                            <li key={index}>
                                                                                <button type="button">
                                                                                    <span>{cont3.c_name}</span>
                                                                                </button>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            }
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        }
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <ul className="header_util">
                        {login ? 
                            <>
                                <li>
                                    <Link to="/mypage" className="btn_join">
                                        <span>마이페이지</span>
                                    </Link>
                                </li>
                                <li>
                                    <button type="button" className="btn_logout" onClick={logoutHandler}>
                                        <span>로그아웃</span>
                                    </button>
                                </li>
                            </>
                            :<>
                                <li>
                                    <Link to="/signup" className="btn_join">
                                        <span>회원가입</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="btn_login">
                                        <span>로그인</span>
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                    <button type="button" className="btn_m" onClick={toggleMoMenu}>
                        <span>모바일 메뉴</span>
                    </button>
                    <div className={`m_gnb_wrap${isMoMenuOpen ? ' on' : ''}`}>
                        <ul className="m_gnb">
                            {menuList.map((cont,i)=>{
                                return(
                                    <li key={i} 
                                        onClick={()=>{setMenuOn(i)}}
                                        className={`${cont.submenu ? 'is_depth' : ''}${menuOn === i ? ' on' : ''}`}
                                    >
                                        {cont.submenu ? <>
                                            <button type="button">
                                                <span>{cont.c_name}</span>
                                            </button>
                                            <ul className="depth2">
                                                {cont.submenu.map((cont2,idx)=>{
                                                    return(
                                                        <li key={idx} className="is_depth">
                                                            <Link to="/">
                                                                <span>대표인사</span>
                                                            </Link>
                                                            <ul className="depth3">
                                                                <li>
                                                                    <Link to="/">
                                                                        <span>경영 이념 및 미션</span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/">
                                                                        <span>윤리경영</span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/">
                                                                        <span>사회공헌</span>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    );
                                                })} 
                                            </ul>
                                            </>
                                            :
                                            <Link to="/">
                                                <span>{cont.c_name}</span>
                                            </Link>
                                        }
                                    </li>
                                );
                            })}
                            <li className="is_depth">
                                <Link to="/">
                                    <span>About Us</span>
                                </Link>
                                <ul className="depth2">
                                    <li className="is_depth">
                                        {/* <!-- 클릭 시 is_depth에 on class 토글 --> */}
                                        <Link to="/">
                                            <span>회사소개</span>
                                        </Link>
                                        <ul className="depth3">
                                            <li>
                                                <Link to="/">
                                                    <span>경영 이념 및 미션</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <span>윤리경영</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <span>사회공헌</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="is_depth">
                                        <Link to="/">
                                            <span>대표인사</span>
                                        </Link>
                                        <ul className="depth3">
                                            <li>
                                                <Link to="/">
                                                    <span>경영 이념 및 미션</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <span>윤리경영</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <span>사회공헌</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <span>연혁</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <span>오시는 길</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/">
                                    <span>Board</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Header;