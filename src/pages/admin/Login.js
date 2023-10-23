const Login = () => {

    return(
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
                                    {/* input 조건 미 충족 시 class 추가 wrong_input */}
                                    <input type="text" placeholder="이메일" className="wrong_input" />
                                </div>
                                <em className="txt_err">이메일 입력 조건이 맞지 않습니다.</em>
                            </div>
                        </div>
                        <div className="form_input">
                            <div className="input_wrap">
                                <div className="input_box pwd_input">
                                    <input type="password" placeholder="비밀번호" />
                                    <button type="button" className="view_pwd">비밀번호 보기</button>
                                </div>
                                <em className="txt_err">비밀번호 입력 조건이 맞지 않습니다.</em>
                            </div>
                        </div>
                        <div className="btn_wrap">
                            <a href="/" rel="noopener noreferrer" className="btn_type25">로그인</a>
                            <a href="/" rel="noopener noreferrer" className="btn_type26">사용자 화면 바로가기</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;