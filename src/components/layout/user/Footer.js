import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import f_logo from "../../../images/user_images/f_logo.png";

const Footer = (props) => {
    const common = useSelector((state)=>state.common);
    const [info, setInfo] = useState({});

    useEffect(()=>{
        setInfo(common.siteInfo);
    },[common.siteInfo]);


    //탑버튼 클릭시
    const onTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    return(<>
        {!props.main &&
            <div className="btn_sub_wrap">
                <button type="button" className="btn_top" onClick={onTopHandler}>탑버튼</button>
            </div>
        }

        <footer id="footer" className="footer">
            <div className="footer_inner">
                <div className="site_info">
                    <div className="f_logo">
                        <img src={f_logo} alt="기산과학"/>
                    </div>
                    <address>
                        <ul>
                            <li>
                                <span>㈜기산과학</span>
                            </li>
                            {info.c_address &&
                                <li>
                                    <span>본사 : {info.c_address}</span>
                                </li>
                            }
                        </ul>
                        <ul>
                            {info.c_tel && 
                                <li>
                                    <span>TEL. {info.c_tel}</span>
                                </li>
                            }
                            {info.c_fax && 
                                <li>
                                    <span>FAX. {info.c_fax}</span>
                                </li>
                            }
                            {info.c_email && 
                                <li>
                                    <span>E-MAIL. {info.c_email}</span>
                                </li>
                            }
                        </ul>
                    </address>
                </div>
                <div className="f_util_wrap">
                    <p className="copy">Copyright ⓒ 2018 Kisan all rights reserved.</p>
                </div>
                {info.c_tel &&
                    <div className="f_tel">
                        <span>대표전화</span>
                        <strong>{info.c_tel}</strong>
                    </div>
                }
            </div>
        </footer>
    </>);
};

export default Footer;