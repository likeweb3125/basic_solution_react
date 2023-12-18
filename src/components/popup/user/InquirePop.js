import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enum_api_uri } from "../../../config/enum";
import * as CF from "../../../config/function";
import { inquirePop, confirmPop } from "../../../store/popupSlice";
import InputBox from "../../component/user/InputBox";
import SelectBox from "../../component/user/SelectBox";
import ConfirmPop from "../ConfirmPop";


const InquirePop = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const board_modify = enum_api_uri.board_modify;
    const [confirm, setConfirm] = useState(false);
    const [applyOkconfirm, setApplyOkConfirm] = useState(false);
    const [boardData, setBoardData] = useState({});
    const [typeSelect,setTypeSelect] = useState("");
    const [content, setContent] = useState("");
    const [agreeCheck, setAgreeCheck] = useState(false);


     // Confirm팝업 닫힐때
     useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
            setApplyOkConfirm(false);
        }
    },[popup.confirmPop]);


    //팝업닫기
    const closePopHandler = () => {
        dispatch(inquirePop(false));
    };


    //인풋값 변경시
    const onInputChangeHandler = (e) => {
        const id = e.currentTarget.id;
        const val = e.currentTarget.value;

        let newData = {...boardData};
            newData[id] = val;
            
        setBoardData(newData);
    };


    //신청버튼 클릭시
    const applyBtnClickHandler = () => {
        if(!boardData.name){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'병원명을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(!boardData.tel){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'연락처를 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(!boardData.email){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'이메일을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }
        // else if(!boardData.type){
        //     dispatch(confirmPop({
        //         confirmPop:true,
        //         confirmPopTit:'알림',
        //         confirmPopTxt:'구분을 선택해주세요.',
        //         confirmPopBtn:1,
        //     }));
        //     setConfirm(true);
        // }
        else if(!boardData.tit){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'제안 제목을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(!content){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'제안 내용을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(!agreeCheck){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'개인정보 수집 및 이용동의를 체크해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else{
            applyHandler();
        }
    };


    // 제휴문의 신청하기
    const applyHandler = () => {
        const formData = new FormData();

        
        const contents = `
            <p>병원명 : ${boardData.name}</p><br/>
            <p>연락처 : ${boardData.tel}</p><br/>
            <p>이메일 : ${boardData.email}</p><br/>
            <p>내용 : ${content}</p><br/>
        `;
        formData.append("category", 50); //게시판 제휴문의 category 고정값
        formData.append("m_name", boardData.name);
        formData.append("b_title", boardData.tit);
        formData.append("b_contents", contents);

        //필요없는 값들-----
        formData.append("b_file", "");
        formData.append("m_email", "");
        formData.append("m_pwd", "");
        formData.append("b_depth", 0);
        formData.append("b_notice", 0);

        axios.post(`${board_modify}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            if (res.status === 200) {
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt:'신청이 완료되었습니다.',
                    confirmPopBtn:1,
                }));
                setApplyOkConfirm(true);
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


    return(<>
        <div className="pop_user_display pop_alliance">
            <div className="dimm"></div>
            <div className="popup_wrap">
                <div className="popup">
                    <div className="pop_tit">
                        <h3><i>지금, </i>지머와 <br/>함께 하세요! <p>지머는 고객에게 새로운 세상을 전달하고, <br/>좋은 시너지를 위해 다양한 제휴 문의를 받습니다.</p></h3>
                    </div>
                    <div className="pop_con">
                        <div className="form_box_wrap">
                            <div className="form_box">
                                <div className="box">
                                    <h5>병원명 <i>*</i></h5>
                                    <div className="input_wrap">
                                        <InputBox 
                                            class={`user_input_box1`}
                                            type={`text`}
                                            placeholder={`병원명을 입력해주세요.`}
                                            value={boardData.name || ""}
                                            onChangeHandler={onInputChangeHandler}
                                            id={`name`}
                                        />
                                    </div>
                                </div>
                                <div className="box">
                                    <h5>연락처 <i>*</i></h5>
                                    <div className="input_wrap">
                                        <InputBox 
                                            class={`user_input_box1`}
                                            type={`text`}
                                            placeholder={`숫자만 입력해주세요.`}
                                            value={boardData.tel || ""}
                                            onChangeHandler={onInputChangeHandler}
                                            id={`tel`}
                                            tel={true}
                                        />
                                    </div>
                                </div>
                                <div className="box">
                                    <h5>이메일 <i>*</i></h5>
                                    <div className="input_wrap">
                                        <InputBox 
                                            class={`user_input_box1`}
                                            type={`text`}
                                            placeholder={`이메일을 입력해주세요.`}
                                            value={boardData.email || ""}
                                            onChangeHandler={onInputChangeHandler}
                                            id={`email`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form_box">
                                <div className="box">
                                    <h5>구분 <i>*</i></h5>
                                    <div className="input_wrap">
                                        <SelectBox 
                                            class="user_select_box1"
                                            list={["문의"]}
                                            selected={typeSelect}
                                            onChangeHandler={(e)=>{
                                                const val = e.currentTarget.value;
                                                const id = e.target.options[e.target.selectedIndex].getAttribute("data-id");
                                                setTypeSelect(val);
                                                // setGroupSelectId(id);
                                            }}
                                            selHidden={true}
                                            objectSel={`board_group`}
                                        />
                                    </div>
                                </div>
                                <div className="box">
                                    <h5>제안제목 <i>*</i></h5>
                                    <div className="input_wrap">
                                        <InputBox 
                                            class={`user_input_box1`}
                                            type={`text`}
                                            placeholder={`제안 제목을 입력해주세요.`}
                                            value={boardData.tit || ""}
                                            onChangeHandler={onInputChangeHandler}
                                            id={`tit`}
                                        />
                                    </div>
                                </div>
                                <div className="box box2">
                                    <h5>제안내용 <i>*</i></h5>
                                    <div className="input_wrap">
                                        <div className="user_textarea_box">
                                            <textarea 
                                                cols="30" 
                                                rows="4"
                                                placeholder="내용을 입력해주세요."
                                                value={content || ""}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="terms_area">
                                    <div className="user_chk_box1">
                                        <input type="checkbox" id="check_agree" className="blind"
                                            onChange={(e)=>{
                                                const checked = e.currentTarget.checked;
                                                if(checked){
                                                    setAgreeCheck(true);
                                                }else{
                                                    setAgreeCheck(false);
                                                }
                                            }}
                                            checked={agreeCheck ? true : false}
                                        />
                                        <label htmlFor="check_agree">개인 정보 수집 및 이용 동의 <i>*</i></label>
                                    </div>
                                    <div className="terms_box">
                                        이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 
    하기 목적 이외의 용도로는 사용되지 않습니다. 

    ① 개인정보 수집 항목 및 수집·이용 목적 가) 수집 항목 (필수항목) - 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항, 외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원 신청서에 기재된 정보 또는 신청자가 제공한 정보 나) 수집 및 이용 목적 - 하이트진로 장학생 선발 전형 진행 - 하이트진로 장학생과의 연락 및 자격확인 - 하이트진로 장학생 자원관리 ② 개인정보 보유 및 이용기간 - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지 ③ 동의거부관리 - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만, 귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수 있음을 알려드립니다.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pop_btn_wrap">
                            <div className="btn_box">
                                <button type="button" className="btn_type4" onClick={applyBtnClickHandler}>제휴 문의 신청</button>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn_pop_close" onClick={closePopHandler}>팝업닫기</button>
                </div>
            </div>
        </div>

        {/* 문의신청완료 confirm팝업 */}
        {applyOkconfirm && <ConfirmPop closePop="custom" onCloseHandler={()=>closePopHandler()} />}

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default InquirePop;