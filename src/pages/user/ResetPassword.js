const ResetPassword = () => {
    return(<>
        <div className="page_user_find">
            <div className="section_inner">
                <div className="user_con_box">
                    <div className="user_con_inner">
                        <h3>
                            <b>비밀번호 재설정</b>
                            <span>새 비밀번호로 재설정해주세요.</span>
                        </h3>
                        <div className="form_inner">
                            <div className="form_input">
                                <h5>새 비밀번호 <i>*</i></h5>
                                <div className="input_wrap">
                                    <div className="input_box pwd_input">
                                        <input type="password" placeholder="영문자, 숫자를 조합하여 12자 이내로 입력"/>
                                        <button type="button" className="view_pwd">비밀번호 보기</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form_input">
                                <h5>새 비밀번호 확인 <i>*</i></h5>
                                <div className="input_wrap">
                                    <div className="input_box pwd_input">
                                        <input type="password" placeholder="영문자, 숫자를 조합하여 12자 이내로 입력"/>
                                        <button type="button" className="view_pwd">비밀번호 보기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <a href="#" className="btn_type25">저장</a>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default ResetPassword;