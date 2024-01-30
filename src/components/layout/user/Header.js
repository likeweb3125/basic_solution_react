import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../../config/enum";
import logo from "../../../images/logo.png";


const Header = () => {
    const location = useLocation();
    const common = useSelector((state)=>state.common);
    const menu_list = enum_api_uri.menu_list;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoMenuOpen, setIsMoMenuOpen] = useState(false);
    const [siteInfo, setSiteInfo] = useState({});

    const [menuList, setMenuList] = useState([]);
    const [menuOn, setMenuOn] = useState(null);
    const [menu2On, setMenu2On] = useState({});


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


    // 전체카테고리 가져오기
    const getMenuList = () => {
        axios.get(menu_list,
            // {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                const data = res.data.data;
                const list = data.filter(item => item.id != 0);
                setMenuList(list);
            }
        })
        .catch((error) => {
            // const err_msg = CF.errorMsgHandler(error);

            // dispatch(confirmPop({
            //     confirmPop:true,
            //     confirmPopTit:'알림',
            //     confirmPopTxt: err_msg,
            //     confirmPopBtn:1,
            // }));
            // setConfirm(true);
        });
    };


    useEffect(()=>{
        getMenuList();
    },[]);


    const onMenu2ClickHandler = (idx) => {
        let newMenuOn = {...menu2On};
        newMenuOn[idx] = !newMenuOn[idx];
        setMenu2On(newMenuOn);
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
                                        <Link to="/">
                                            <span>{cont.c_name}</span>
                                        </Link>
                                        {cont.submenu && 
                                            <ul className={`depth2${menuOn === i ? ' on' : ''}`}>
                                                {cont.submenu.map((cont2,idx)=>{
                                                    return(
                                                        <li key={idx} 
                                                            className={`${cont2.submenu ? 'is_depth' : ''}${menu2On[idx] ? ' on' : ''}`} 
                                                            onClick={()=>onMenu2ClickHandler(idx)}
                                                        >
                                                            <Link to="/">
                                                                <span>{cont2.c_name}</span>
                                                            </Link>
                                                            {cont2.submenu &&
                                                                <ul className="depth3">
                                                                    {cont2.submenu.map((cont3, index)=>{
                                                                        return(
                                                                            <li key={index}>
                                                                                <Link to="/">
                                                                                    <span>{cont3.c_name}</span>
                                                                                </Link>
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
                        <li>
                            <Link to="/" className="btn_join">
                                <span>회원가입</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="btn_login">
                                <span>로그인</span>
                            </Link>
                        </li>
                        {/* <!-- <li>
                            <Link to="/" className="btn_logout">
                                <span>로그아웃</span>
                            </Link>
                        </li> --> */}
                    </ul>
                    <button type="button" className="btn_m">
                        <span>모바일 메뉴</span>
                    </button>
                    <div className="m_gnb_wrap">
                        <ul className="m_gnb">
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
                            <li className="is_depth">
                                <Link to="/">
                                    <span>Service</span>
                                </Link>
                                <ul className="depth2">
                                    <li className="is_depth">
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
                            <li>
                                <Link to="/">
                                    <span>My Page</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    </>);
};

export default Header;