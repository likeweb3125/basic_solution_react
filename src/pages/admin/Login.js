import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { loginUser, siteId } from "../../store/userSlice";
import { currentPage } from "../../store/commonSlice";
import { confirmPop } from "../../store/popupSlice";
import ConfirmPop from "../../components/popup/ConfirmPop";

const Login = () => {
    const login = enum_api_uri.login;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popup = useSelector((state)=>state.popup);
    const [confirm, setConfirm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [passView, setPassView] = useState(false);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //로그인버튼 클릭하기
    const loginBtnClickHandler = () => {
        let newError = { ...error };

        if (email.length === 0) {
            newError.email = true;
        }
        if (password.length === 0) {
            newError.password = true;
        }

        setError(newError);

        if (!newError.email && !newError.password) {
            loginHandler();
        }
    };


    //로그인하기
    const loginHandler = () => {
        const body = {
            // m_email:email,
            // m_password:password,
            m_email:"likeweb@likeweb.co.kr",
            m_password:"test!@#$",
            m_level:"9" //관리자 회원레벨 9
        };

        axios.post(login,body)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                //로그인한회원정보 store 에 저장
                dispatch(loginUser(data));

                //siteId store 에 저장 (고정값)
                dispatch(siteId("likeweb"));

                //관리자단 현재페이지 메인으로 변경
                dispatch(currentPage({}));

                //관리자단 메인으로 페이지이동
                navigate('/console');
            }
        })
        .catch((error) => {
            console.log(error)
            // console.log(error.response.data.message)
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
        console.log(error)
    },[error]);


    return(<>
        <main id="main" className="main">
            <div className="page_admin_login"> 
                <div className="admin_login">
                    <div className="login_tit">
                        <h1 className="logo">Lorem ipsum</h1>
                        <strong>로그인</strong>
                    </div>
                    <div className="form_inner">
                        <div className="form_input">
                            <div className="input_wrap">
                                <div className="input_box">
                                    <input type="text" 
                                        placeholder="이메일" 
                                        className={error.email ? "wrong_input" : ""} 
                                        onChange={(e)=>{
                                            const val = e.currentTarget.value;
                                            setEmail(val);
                                            if(val.length > 0){
                                                let newError = {...error};
                                                    newError.email = false;
                                                setError(newError);
                                            }
                                        }} 
                                    />
                                </div>
                                {error.email && <em className="txt_err">이메일을 입력해주세요.</em>}
                            </div>
                        </div>
                        <div className="form_input">
                            <div className="input_wrap">
                                <div className="input_box pwd_input">
                                    <input type={passView ? "text" : "password"} 
                                        placeholder="비밀번호" 
                                        className={error.password ? "wrong_input" : ""} 
                                        onChange={(e)=>{
                                            const val = e.currentTarget.value;
                                            setPassword(val);
                                            if(val.length > 0){
                                                let newError = {...error};
                                                    newError.password = false;
                                                setError(newError);
                                            }
                                        }}
                                    /> 
                                    <button type="button" className="view_pwd" onClick={()=>setPassView(!passView)}>비밀번호 보기</button>
                                </div>
                                {error.password && <em className="txt_err">비밀번호를 입력해주세요.</em>}
                            </div>
                        </div>
                        <div className="btn_wrap">
                            <button type="button" className="btn_type25" onClick={loginBtnClickHandler}>로그인</button>
                            <button type="button" className="btn_type26">사용자 화면 바로가기</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Login;