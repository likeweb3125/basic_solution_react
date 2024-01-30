import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { termsCheckList } from "../../store/etcSlice";
import { confirmPop, termsPop } from "../../store/popupSlice";
import ConfirmPop from "../../components/popup/ConfirmPop";
import InputBox from "../../components/component/InputBox";


const SignUp = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const etc = useSelector((state)=>state.etc);
    const site_policy = enum_api_uri.site_policy;
    const [confirm, setConfirm] = useState(false);
    const [termsList, setTermsList] = useState([]);
    const [allCheck, setAllCheck] = useState(false);
    const [checkList, setCheckList] = useState([]);
    const [checkList2, setCheckList2] = useState([]);
    const [error, setError] = useState({});


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //약관 리스트 가져오기
    const getTermsList = () => {
        axios.get(site_policy)
        .then((res)=>{
            if(res.status === 200){
                const data = res.data.data;
                setTermsList(data.policy_list);
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


    //맨처음 약관리스트 가져오기
    useEffect(()=>{
        getTermsList();
    },[]);


    //전체약관 동의
    const allAgreeHandler = (checked) => {
        setAllCheck(!allCheck);

        const list = termsList.map((item) => item.idx);
        if (checked) {
            setCheckList(list);
        }else{
            setCheckList([]);
        }
    }


    //이용약관 체크박스 체크시
    const onCheckHandler = (idx, checked) => {
        let newCheckList = [...checkList];
        
        if(checked){
            newCheckList = newCheckList.concat(idx);
        }else if(!checked && newCheckList.includes(idx)){
            newCheckList = newCheckList.filter((item)=>item !== idx);
        }
        setCheckList(newCheckList);
    };


    //마케팅수신동의 선택 체크박스 체크시
    const onCheckHandler2 = (idx, checked) => {
        let newCheckList2 = [...checkList2];

        if(checked){
            newCheckList2 = newCheckList2.concat(idx);
        }else if(!checked && newCheckList2.includes(idx)){
            newCheckList2 = newCheckList2.filter((item)=>item !== idx);
        }
        setCheckList2(newCheckList2);
    };

    
    useEffect(()=>{
        dispatch(termsCheckList(checkList));

        if(checkList.includes(8)){
            setCheckList2([1,2]);
        }else{
            setCheckList2([]);
        }

        if(checkList.length > 0 && checkList.length === termsList.length){
            setAllCheck(true);
        }else{
            setAllCheck(false);
        }
    },[checkList]);


    useEffect(()=>{
        let newCheckList = [...checkList];

        if(checkList2.includes(1) && checkList2.includes(2)){
            if(!newCheckList.includes(8)){
                newCheckList = newCheckList.concat(8);
                setCheckList(newCheckList);
            }
        }else{
            if(newCheckList.includes(8)){
                newCheckList = newCheckList.filter((item)=>item !== 8);
                setCheckList(newCheckList);
            }
        }
    },[checkList2]);



    useEffect(()=>{
        setCheckList(etc.termsCheckList);
    },[etc.termsCheckList]);



    return(<>
        <div className="page_user_join">
            <div className="section_inner">
                <div className="join_form">
                    <h3 className="join_tit">회원가입</h3>
                    <div className="terms_wrap">
                        <div className="all_chk_wrap">
                            <div className="chk_box3">
                                <input type="checkbox" id="allChk" className="blind"
                                    onChange={(e)=>{
                                        const checked = e.currentTarget.checked;
                                        allAgreeHandler(checked);
                                    }}
                                    checked={allCheck}
                                />
                                <label htmlFor="allChk">전체 이용약관에 동의</label>
                            </div>
                        </div>
                        <div className="terms_box">
                            <ul className="list_terms">
                                {termsList.map((cont,i)=>{
                                    return(
                                        <li key={i}>
                                            <div className="terms_chk">
                                                <div className="chk_box3">
                                                    <input type="checkbox" id={`terms${cont.idx}`} className="blind"
                                                        onChange={(e)=>{
                                                            const checked = e.currentTarget.checked;
                                                            onCheckHandler(cont.idx, checked);
                                                        }}
                                                        checked={checkList.includes(cont.idx)}
                                                    />
                                                    <label htmlFor={`terms${cont.idx}`}>{cont.p_title}{cont.constraint_type == 'Y' ? ' (필수)' : ' (선택)'}</label>
                                                </div>
                                                <button type="button" className="btn_open_terms" onClick={()=>dispatch(termsPop({termsPop:true,termsPopIdx:cont.idx}))}>약관 보기</button>
                                            </div>
                                            {/* 마케팅 수신 동의 일때만 노출 */}
                                            {cont.policy_type == '4' &&
                                                <div className="chk_wrap">
                                                    <div className="chk_box1">
                                                        <input type="checkbox" id="email_check" className="blind"
                                                            onChange={(e)=>{
                                                                const checked = e.currentTarget.checked;
                                                                onCheckHandler2(1, checked);
                                                            }} 
                                                            checked={checkList2.includes(1)}
                                                        />
                                                        <label htmlFor="email_check">[선택] 이메일 수신 동의</label>
                                                    </div>
                                                    <div className="chk_box1">
                                                        <input type="checkbox" id="sms_check" className="blind"
                                                            onChange={(e)=>{
                                                                const checked = e.currentTarget.checked;
                                                                onCheckHandler2(2, checked);
                                                            }} 
                                                            checked={checkList2.includes(2)}
                                                        />
                                                        <label htmlFor="sms_check">[선택] 문자 수신 동의</label>
                                                    </div>
                                                </div>
                                            }
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="form_inner">
                        <div className="form_input">
                            <h5>이메일 <i>*</i></h5>
                            <div className="input_wrap">
                                <InputBox
                                    className="input_box"
                                    type={`text`}
                                    placeholder="이메일" 
                                    inputClassName={error.email ? "wrong_input" : ""}
                                    // value={email}
                                    onChangeHandler={(e)=>{
                                        const val = e.currentTarget.value;
                                        // setEmail(val);
                                        // if(val.length > 0){
                                        //     let newError = {...error};
                                        //         newError.email = false;
                                        //     setError(newError);
                                        // }
                                    }} 
                                />
                                {error.email && <em className="txt_err">이메일을 입력해주세요.</em>}
                            </div>
                        </div>
                        <div className="form_input">
                            <h5>비밀번호 <i>*</i></h5>
                            <div className="input_wrap">
                                <div className="input_box pwd_input">
                                    <input type="password" placeholder="영문자, 숫자를 조합하여 12자 이내로 입력"/>
                                    <button type="button" className="view_pwd">비밀번호 보기</button>
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <h5>비밀번호 확인 <i>*</i></h5>
                            <div className="input_wrap">
                                <div className="input_box pwd_input">
                                    <input type="password" placeholder="영문자, 숫자를 조합하여 12자 이내로 입력"/>
                                    <button type="button" className="view_pwd">비밀번호 보기</button>
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <h5>휴대폰 번호 <i>*</i></h5>
                            <div className="input_wrap">
                                <div className="sign_phone">
                                    <div className="input_box">
                                        <input type="text" placeholder="숫자만"/>
                                        {/* 휴대폰 번호를 올바르게 입력시 인증번호 전송 버튼 활성화 */}
                                        {/* <a href="#" className="btn_sign on">인증번호 전송</a> */}
                                        <a href="#" className="btn_sign">인증번호 전송</a>
                                    </div>
                                    <div className="input_box">
                                        <input type="text" placeholder="인증번호 입력"/>
                                        <a href="#" className="btn_sign on">인증번호 전송</a>
                                        <b className="sign_time">05:00</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_wrap">
                            <button type="button" className="btn_type25 w_100">완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default SignUp;