import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../images/user_images/logo.png";
import logo_color from "../../../images/user_images/logo_color.png";
import img_flag from "../../../images/user_images/img_flag.png";
import { useLocation } from "react-router-dom";


//뎁스없는 메뉴
const GnbItem = ({to, children}) => {
    return(
        <li>
            <Link to={to}>
                <span>{children}</span>
            </Link>
        </li> 
    );
};


//뎁스있는 메뉴
const GnbItemWithDepth = ({ effect, to, children, depth2 }) => {
    const [isDepthOn, setIsDepthOn] = useState(false);

    const handleMouseEnter = () => {
        if(effect){
            setIsDepthOn(true);
        }
    };

    const handleMouseLeave = () => {
        if(effect){
            setIsDepthOn(false);
        }
    };

    return (
        <li className="is_depth" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link to={to}>
                <span>{children}</span>
            </Link>
            <ul className={`depth2${effect && isDepthOn ? " fadeIn" : " fadeOut"}`}>
                {depth2.map((child, index) => (
                    <li key={index}>
                        <Link to={child.to}>
                            <span>{child.children}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
};


const Header = (props) => {
    const location = useLocation();
    const common = useSelector((state)=>state.common);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoMenuOpen, setIsMoMenuOpen] = useState(false);
    const [siteInfo, setSiteInfo] = useState({});

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


    return(<>
        <header id="header" className={`header${!props.main ? " color_header" : ""}`}>
            <div className="header_inner">
                <h1 className="logo">
                    <div className="logo1">
                        <Link to="/">
                            <img src={logo} alt="로고"/>
                        </Link>
                    </div>
                    <div className="logo2">
                        <Link to="/">
                            <img src={logo_color} alt="로고"/>
                        </Link>
                    </div>
                </h1>
                <div className="menu_wrap">
                    <nav>
                        <ul className="gnb">
                            <GnbItem to="/clearlasik">클리어라식</GnbItem>
                            <GnbItem to="/ziemer">지머</GnbItem>
                            <GnbItemWithDepth effect={true} to="/news" depth2={[{to:'/news', children:'뉴스'},{to:'/paper', children:'논문'}]}>
                                매거진
                            </GnbItemWithDepth>
                            <GnbItem to="/hospital">클리어병원 찾기</GnbItem>
                        </ul>
                    </nav>
                    <button type="button" className={`btn_all_menu ${isMenuOpen ? 'on' : ''}`} onClick={toggleMenu}>
                        <span>전체 메뉴</span>
                    </button>
                    <div className={`all_menu_wrap ${isMenuOpen ? 'fadeIn' : 'fadeOut'}`}>
                        <div className="all_menu">
                            <div className="logo_box">
                                <h2 className="logo">
                                    <Link to="">
                                        <img src={logo} alt="로고"/>
                                    </Link>
                                </h2>
                            </div>
                            <ul className="all_gnb">
                                <GnbItem to="/clearlasik">클리어라식</GnbItem>
                                <GnbItem to="/ziemer">지머</GnbItem>
                                <GnbItemWithDepth effect={false} to="/news" depth2={[{to:'/news', children:'뉴스'},{to:'/paper', children:'논문'}]}>
                                    매거진
                                </GnbItemWithDepth>
                                <GnbItem to="/hospital">클리어병원 찾기</GnbItem>
                            </ul>
                        </div>
                    </div>
                    <button type="button" className="btn_m" onClick={toggleMoMenu}>
                        <span>모바일 메뉴</span>
                    </button>
                    <div className={`m_gnb_wrap${isMoMenuOpen ? " on" : ""}`}>
                        <div className="dimm"></div>
                        <div className="m_gnb_box">
                            <div className="logo_box">
                                <Link to="/">
                                    <img src={logo} alt="로고"/>
                                </Link>
                            </div>
                            <ul className="m_gnb">
                                <GnbItem to="/clearlasik">클리어라식</GnbItem>
                                <GnbItem to="/ziemer">지머</GnbItem>
                                <GnbItemWithDepth effect={false} to="/news" depth2={[{to:'/news', children:'뉴스'},{to:'/paper', children:'논문'}]}>
                                    매거진
                                </GnbItemWithDepth>
                                <GnbItem to="/hospital">클리어병원 찾기</GnbItem>
                            </ul>
                            {siteInfo.c_tel &&
                                <div className="tel_box">
                                    <span>대표전화</span>
                                    <strong>{siteInfo.c_tel}</strong>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flag">
                <img src={img_flag} alt="이미지"/>
            </div>
            <div className="pin_link">
                <Link to="/hospital">
                    <span>클리어 병원 찾기</span>
                </Link>
            </div>
        </header>
    </>);
};

export default Header;