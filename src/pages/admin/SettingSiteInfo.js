import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import InputBox from "../../components/component/admin/InputBox";
import ConfirmPop from "../../components/popup/ConfirmPop";


const SettingSiteInfo = () => {
    const site_info = enum_api_uri.site_info;
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const [confirm, setConfirm] = useState(false);

    const [siteName, setSiteName] = useState("");
    const [webTitle, setWebTitle] = useState("");
    const [ceo, setCeo] = useState("");
    const [tel, setTel] = useState("");
    const [num, setNum] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [fax, setFax] = useState("");
    const [manager, setManager] = useState("");


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //회원프로필정보 가져오기
    const getInfo = () => {
        axios.get(`${site_info.replace(":site_id","likeweb")}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;
                console.log(data)
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

    
    useEffect(()=>{
        getInfo();
    },[]);


    //인풋값 변경시
    const onInputChangeHandler = (e) => {
        const id = e.currentTarget.id;
        const val = e.currentTarget.value;

        if(id == "siteName"){
            setSiteName(val);
        }
        if(id == "webTitle"){
            setWebTitle(val);
        }
        if(id == "ceo"){
            setCeo(val);
        }
        if(id == "tel"){
            setTel(val);
        }
        if(id == "num"){
            setNum(val);
        }
        if(id == "email"){
            setEmail(val);
        }
        if(id == "address"){
            setAddress(val);
        }
        if(id == "fax"){
            setFax(val);
        }
        if(id == "manager"){
            setManager(val);
        }
    };

    return(<>
        <div className="page_admin_setting">
            <div className="content_box">
                <div className="tit">
                    <h3>
                        <b>기본 정보</b>
                    </h3>
                    <p>입력된 정보는 웹사이트 하단과 개인정보취급방침 고지란에 기재됩니다.</p>
                </div>
                <div className="tbl_wrap2">
                    <table>
                        <caption>정보 테이블</caption>
                        <colgroup>
                            <col style={{width: "140px"}}/>
                            <col style={{width: "auto"}}/>
                            <col style={{width: "24px"}}/>
                            <col style={{width: "140px"}}/>
                            <col style={{width: "auto"}}/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>사이트이름 <i>*</i></th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`사이트이름을 입력해주세요.`}
                                        countShow={true}
                                        countMax={16}
                                        count={siteName.length}
                                        value={siteName}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`siteName`}
                                    />
                                </td>
                                <td></td>
                                <th>웹 브라우저 타이틀</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`웹 브라우저 타이틀을 입력해주세요.`}
                                        countShow={true}
                                        countMax={16}
                                        count={webTitle.length}
                                        value={webTitle}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`webTitle`}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>대표자</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`대표자를 입력해주세요.`}
                                        value={ceo}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`ceo`}
                                    />
                                </td>
                                <td></td>
                                <th>대표전화</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`대표전화를 입력해주세요.`}
                                        value={tel}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`tel`}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>사업자번호</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`사업자번호를 입력해주세요.`}
                                        value={num}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`num`}
                                    />
                                </td>
                                <td></td>
                                <th>통신판매번호</th>
                                <td>
                                    <div className="input_box">
                                        <input type="text" placeholder="통신판매번호를 입력해주세요."/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`이메일을 입력해주세요.`}
                                        value={email}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`email`}
                                    />
                                </td>
                                <td></td>
                                <th>주소</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`주소를 입력해주세요.`}
                                        value={address}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`address`}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>FAX 번호</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`FAX 번호를 입력해주세요.`}
                                        value={fax}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`fax`}
                                    />
                                </td>
                                <td></td>
                                <th>개인정보관리책임자</th>
                                <td>
                                    <InputBox 
                                        type={`text`}
                                        placeholder={`개인정보관리책임자를 입력해주세요.`}
                                        value={manager}
                                        onChangeHandler={onInputChangeHandler}
                                        id={`manager`}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="content_box">
                <div className="tit">
                    <h3>
                        <b>메타정보</b>
                    </h3>
                    <p>웹마스터 도구에 활용되어 포털 검색 시 노출되는 정보입니다.</p>
                </div>
                <div className="tbl_wrap2">
                    <table>
                        <caption>정보 테이블</caption>
                        <colgroup>
                            <col style={{width: "140px"}}/>
                            <col style={{width: "auto"}}/>
                            <col style={{width: "24px"}}/>
                            <col style={{width: "140px"}}/>
                            <col style={{width: "auto"}}/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>브라우저 타이틀 <i>*</i></th>
                                <td>
                                    <div className="input_box">
                                        <input type="text" placeholder="브라우저 타이틀을 입력해주세요."/>
                                    </div>
                                </td>
                                <td></td>
                                <th>메타설명</th>
                                <td>
                                    <div className="input_box">
                                        <input type="text" placeholder="메타설명을 입력해주세요."/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>메타 태그</th>
                                <td>
                                    <div className="input_box">
                                        <input type="text" placeholder="메타 태그를 입력해주세요."/>
                                    </div>
                                </td>
                                <td></td>
                                <th>메타 분류</th>
                                <td>
                                    <div className="input_box">
                                        <input type="text" placeholder="메타 분류를 입력해주세요."/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="form_btn_wrap">
                <button type="button" className="btn_type3">취소</button>
                <button type="button" className="btn_type4">등록</button>
            </div>
        </div>

        {/* confirm팝업 */}
        {/* {confirm && <ConfirmPop />} */}
    </>);
};

export default SettingSiteInfo;