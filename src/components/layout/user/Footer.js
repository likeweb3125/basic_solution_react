import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import f_logo from "../../../images/f_logo.png";

const Footer = () => {
    const common = useSelector((state)=>state.common);
    const [info, setInfo] = useState({});

    useEffect(()=>{
        setInfo(common.siteInfo);
    },[common.siteInfo]);


    return(<>
        <footer id="footer" className="footer">
            <div className="footer_inner">
                <div className="site_info">
                    <div className="f_logo">
                        <img src={f_logo} alt="로고"/>
                    </div>
                    <address>
                        <ul>
                            {info.c_site_name &&
                                <li>
                                    <span>{info.c_site_name}</span>
                                </li>
                            }
                            {info.c_ceo &&
                                <li>
                                    <span>대표이사</span>
                                    <span>{info.c_ceo}</span>
                                </li>
                            }
                            {info.c_num &&
                                <li>
                                    <span>사업자등록번호</span>
                                    <span>{info.c_num}</span>
                                </li>
                            }
                        </ul>
                        <ul>
                            {info.c_address &&
                                <li>
                                    <span>{info.c_address}</span>
                                </li>
                            }
                            {info.c_tel &&
                                <li>
                                    <span>Tel</span>
                                    <span>{info.c_tel}</span>
                                </li>
                            }
                        </ul>
                        <ul>
                            {info.c_email &&
                                <li>
                                    <span>Email</span>
                                    <span>{info.c_email}</span>
                                </li>
                            }
                        </ul>
                    </address>
                </div>
                <div className="f_util_wrap">
                    <ul className="f_util">
                        <li className="on">
                            <a href="#">개인정보처리방침</a>
                        </li>
                        <li>
                            <a href="#">이용약관</a>
                        </li>
                        <li>
                            <a href="#">이메일 무단수집 거부</a>
                        </li>
                    </ul>
                    <p className="copy">©2023 Lorem ipsum Co.,Ltd. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    </>);
};

export default Footer;