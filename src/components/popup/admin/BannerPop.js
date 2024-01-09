import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { adminBannerPop, confirmPop, adminBannerPopModify, adminBannerPopWrite } from "../../../store/popupSlice";
import ConfirmPop from "../../popup/ConfirmPop";
import InputBox from "../../component/admin/InputBox";
import InputBox2 from "../../component/admin/InputBox2";
import InputDatepicker from "../../component/admin/InputDatepicker";
import Editor from "../../component/Editor";
import moment from "moment";


const BannerPop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const banner_detail = enum_api_uri.banner_detail;
    const banner_list = enum_api_uri.banner_list;
    const [confirm, setConfirm] = useState(false);
    const [closeConfirm, setCloseConfirm] = useState(false);
    const [saveOkConfirm, setSaveOkConfirm] = useState(false);
    const [deltConfirm, setDeltConfirm] = useState(false);
    const [info, setInfo] = useState({});
    const [error, setError] = useState({});
    const [content, setContent] = useState("");
    const [useBtn, setUseBtn] = useState("N");
    const [htmlTabList, setHtmlTabList] = useState(["CH에디터","Textarea"]);
    const [htmlTab, setHtmlTab] = useState(1);
    const [showRaw, setShowRaw] = useState(false);
    const [rawHtml, setRawHtml] = useState('');
    const [templateText, setTemplateText] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sizeCheck, setSizeCheck] = useState("1");
    const [linkCheck, setLinkCheck] = useState("");
    const [tab, setTab] = useState('1');
    const [movTypeCheck, setMovTypeCheck] = useState("1");
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerFileData, setBannerFileData] = useState(null);
    const [bannerFileThumbs, setBannerFileThumbs] = useState([]);
    


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
            setCloseConfirm(false);
            setSaveOkConfirm(false);
            setDeltConfirm(false);
        }
    },[popup.confirmPop]);


    //닫기, 취소버튼 클릭시
    const closeBtnClickHandler = () => {
        dispatch(confirmPop({
            confirmPop:true,
            confirmPopTit:'알림',
            confirmPopTxt: '작성중인 내용을 종료하시겠습니까?',
            confirmPopBtn:2,
        }));
        setCloseConfirm(true);
    };

    //팝업닫기
    const closePopHandler = () => {
        dispatch(adminBannerPop({adminBannerPop:false,adminBannerPopIdx:null,adminBannerPopType:null}));
        dispatch(adminBannerPopWrite(false));
    };


    //상세정보 가져오기
    const getBannerData = () => {
        axios.get(`${banner_detail.replace(":idx",popup.adminBannerPopIdx)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setInfo(data);

                setTab(data.b_c_type[0]);
                setSizeCheck(data.b_size[0]);        //배너노출사이즈 종류 커버 or 원본사이즈고정
                setLinkCheck(data.b_url_target[0]);  //배너 링크 열림창

                //카테고리 종류가 동여상일때 동영상업로드 체크값 넣기
                if(data.b_c_type[0] == '2'){
                    setMovTypeCheck(data.b_mov_type[0]);
                }
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            if(error.response.status === 401){//토큰에러시 관리자단 로그인페이지로 이동
                navigate("/console/login");
            }else{
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt: err_msg,
                    confirmPopBtn:1,
                }));
                setConfirm(true);
            }
        });
    };


    //맨처음 
    useEffect(()=>{
        //배너수정일때 상세정보 가져오기
        if(!popup.adminBannerPopWrite){
            getBannerData();
        }
        //배너등록일때
        else{
            setLinkCheck("1");
        }
    },[]);


    useEffect(()=>{
        if(Object.keys(info).length > 0){
            setInfo(info);
            
            if(info.p_open){
                setUseBtn(info.p_open[0]);
            }
            if(info.p_s_date){
                let dateString = info.p_s_date;
                let dateParts = dateString.split('.');
                let year = parseInt(dateParts[0]);
                let month = parseInt(dateParts[1]) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
                let day = parseInt(dateParts[2]);

                let date = new Date(year, month, day);
                setStartDate(date);
            }
            if(info.p_e_date){
                let dateString = info.p_e_date;
                let dateParts = dateString.split('.');
                let year = parseInt(dateParts[0]);
                let month = parseInt(dateParts[1]) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
                let day = parseInt(dateParts[2]);

                let date = new Date(year, month, day);
                setEndDate(date);
            }
            setContent(info.p_content);

            if(info.p_width_size && info.p_height_size){
                if(info.p_width_size.length > 0 && info.p_height_size.length > 0){
                    let newError = {...error};
                    newError.p_size = false;
                    setError(newError);
                }
            }
            if(info.p_left_point && info.p_top_point){
                if(info.p_left_point.length > 0 && info.p_top_point.length > 0){
                    let newError = {...error};
                    newError.p_point = false;
                    setError(newError);
                }
            }
        }
    },[info]);


    //카테고리종류 탭 변경시
    useEffect(()=>{
        //첨부한 배너파일 삭제
        // bannerFileDeltHandler();
    },[tab]);


    //인풋값 변경시
    const onInputChangeHandler = (e) => {
        const id = e.currentTarget.id;
        const val = e.currentTarget.value;

        let newInfo = {...info};
            newInfo[id] = val;
            
        setInfo(newInfo);

        if(id == "b_title" && val.length > 0){
            let newError = {...error};
                newError.b_title = false;
            setError(newError);
        }
        if(id == "b_width_size" && val.length > 0){
            let newError = {...error};
                newError.b_width_size = false;
            setError(newError);
        }
        if(id == "b_height_size" && val.length > 0){
            let newError = {...error};
                newError.b_height_size = false;
            setError(newError);
        }
        if(id == "b_mov_url" && val.length > 0){
            let newError = {...error};
                newError.b_mov_url = false;
            setError(newError);
        }
    };


    //체크박스, 라디오 값 변경시
    const onCheckChangeHandler = (checked, name, val) => {
        let newData = {...info};

        if(checked){
            newData[name] = val;
        }else{
            newData[name] = "";
        }
        
        setInfo(newData);
    };


    //에디터내용 값
    const onEditorChangeHandler = (e) => {
        setContent(e);

        //배너html 내용 에러문구 false
        if(e){
            let newError = { ...error };
            newError.b_content = false;
            setError(newError);
        }
    };


    //에디터 HTML 버튼클릭시 textarea 보이기
    const handleClickShowRaw = () => {
        setShowRaw(!showRaw);
    };


    //에디터 HTML 버튼 토글
    useEffect(()=>{
        if (showRaw) {
            setRawHtml(content);
        }else {
            setContent(rawHtml);
        }
    },[showRaw]);


    //배너파일 첨부
    const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
        accept: {
            [tab == '1' ? 'image/*' : 'video/*']: []
        },
        multiple: false, // 여러 개의 파일 선택 불가능하도록 설정
        onDrop: acceptedFiles => {
            setBannerFileThumbs(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            setBannerFile(acceptedFiles[0].name);
            setBannerFileData(acceptedFiles);

            //배너파일 에러문구 false
            let newError = {...error};
            newError.b_file = false;
            setError(newError);
        }
    });

    //배너파일 썸네일
    const bannerFileThumb = bannerFileThumbs[0];

    useEffect(() => {
        return () => {
            if (bannerFileThumb) {
                URL.revokeObjectURL(bannerFileThumb.preview);
            }
        };
    }, [bannerFileThumb]);


    // 첨부한 배너파일 삭제
    const bannerFileDeltHandler = () => {
        setBannerFile(null);
        setBannerFileData(null);
        setBannerFileThumbs([]);
    };


    //저장버튼 클릭시
    const saveBtnClickHandler = () => {
        let newError = { ...error };

        if (!info.b_title) {
            newError.b_title = true;
        }
        if (!info.b_width_size) {
            newError.b_width_size = true;
        }
        if (!info.b_height_size) {
            newError.b_height_size = true;
        }
        //카테고리종류가 이미지 일때
        if(tab !== '3'){
            if(!bannerFileData){
                newError.b_file = true;
            }
        }
        //카테고리종류가 동영상 일때
        if(tab == '2'){
            if(movTypeCheck != "2" && !bannerFileData){
                newError.b_file = true;
            }
            //동영상 업로드 URL입력 일때
            if(movTypeCheck == "2" && !info.b_mov_url){
                newError.b_mov_url = true;
            }
        }
        //카테고리종류가 html 일때
        if(tab == '3'){
            let cont;
            if(htmlTab === 1){
                if(showRaw){
                    cont = rawHtml;
                }else{
                    if(content == '<p><br></p>'){
                        cont = content.replace(/<p><br><\/p>/g, "");
                    }else{
                        cont = content;
                    }
                }
            }else{
                cont = templateText;
            }

            if(!cont){
                newError.b_content = true;
            }
        }
        
        setError(newError);

        
        if (!newError.b_title && !newError.b_width_size && !newError.b_height_size && !newError.b_file && !newError.b_mov_url && !newError.b_content) {
            saveHandler();
        }
    };


    //저장하기
    const saveHandler = () => {
        //새로 작성일때
        if(popup.adminBannerPopWrite){
            let sDate = "";
            if(startDate){
                sDate = moment(startDate).format("YYYY.MM.DD");
            }
            let eDate = "";
            if(endDate){
                eDate = moment(endDate).format("YYYY.MM.DD");
            }

            let cont;
            if(showRaw){
                cont = rawHtml;
            }else{
                cont = content;
            }
            const body = {
                b_type:popup.adminBannerPopType,
                b_open:useBtn,
                b_title:info.b_title,
                b_s_date:sDate,
                b_e_date:eDate,
                b_width_size:info.b_width_size,
                b_height_size:info.b_height_size,
                b_size:sizeCheck,
                b_c_type:tab,
                b_file:bannerFileData[0],
                b_url:info.b_url,
                b_url_target:linkCheck,
                b_mov_type:movTypeCheck,
                b_mov_url:info.b_mov_url,
                b_mov_play:info.b_mov_play || '',
                b_mov_sound:info.b_mov_sound || '',
                b_content:cont || ''
            };
            axios.post(`${banner_list}`, body, 
                {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
            )
            .then((res)=>{
                if(res.status === 200){
                    dispatch(confirmPop({
                        confirmPop:true,
                        confirmPopTit:'알림',
                        confirmPopTxt:'저장되었습니다.',
                        confirmPopBtn:1,
                    }));
                    setSaveOkConfirm(true);
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
        }
        //수정일때
        else{
            let sDate = "";
            if(startDate){
                sDate = moment(startDate).format("YYYY.MM.DD");
            }
            let eDate = "";
            if(endDate){
                eDate = moment(endDate).format("YYYY.MM.DD");
            }

            let b_file = '';
            if(bannerFileData){
                bannerFileData.forEach((file) => {
                    b_file = file;
                });
            }

            let cont;
            if(showRaw){
                cont = rawHtml;
            }else{
                cont = content;
            }

            const body = {
                idx:popup.adminBannerPopIdx,
                b_type:popup.adminBannerPopType,
                b_open:useBtn,
                b_title:info.b_title,
                b_s_date:sDate,
                b_e_date:eDate,
                b_width_size:info.b_width_size,
                b_height_size:info.b_height_size,
                b_size:sizeCheck,
                b_c_type:tab,
                b_file:b_file,
                b_url:info.b_url,
                b_url_target:linkCheck,
                b_mov_type:movTypeCheck,
                b_mov_url:info.b_mov_url,
                b_mov_play:info.b_mov_play || '',
                b_mov_sound:info.b_mov_sound || '',
                b_content:cont || ''
            };
            axios.put(`${banner_list}`, body, 
                {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
            )
            .then((res)=>{
                if(res.status === 200){
                    dispatch(confirmPop({
                        confirmPop:true,
                        confirmPopTit:'알림',
                        confirmPopTxt:'저장되었습니다.',
                        confirmPopBtn:1,
                    }));
                    setSaveOkConfirm(true);
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
        }
    };

    
    //저장완료
    const saveOkHandler = () => {
        closePopHandler();
        dispatch(adminBannerPopModify(true));
    };


    //삭제버튼 클릭시
    const deltBtnClickHandler = () => {
        dispatch(confirmPop({
            confirmPop:true,
            confirmPopTit:'알림',
            confirmPopTxt:'해당 배너를 삭제하시겠습니까?',
            confirmPopBtn:2,
        }));
        setDeltConfirm(true);
    };


    // 배너삭제하기
    const deltHandler = () => {
        const body = {
            idx: popup.adminBannerPopIdx,
        };
        axios.delete(banner_list,
            {
                data: body,
                headers: {Authorization: `Bearer ${user.loginUser.accessToken}`}
            }
        )
        .then((res)=>{
            if(res.status === 200){
                closePopHandler();
                dispatch(adminBannerPopModify(true));
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            if(error.response.status === 401){//토큰에러시 관리자단 로그인페이지로 이동
                navigate("/console/login");
            }else{
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt: err_msg,
                    confirmPopBtn:1,
                }));
                setConfirm(true);
            }
        });
    };


    return(<>
        <div className="pop_display pop_reg_pop">
            <div className="dimm"></div>
            <div className="popup_wrap">
                <div className="popup">
                    <div className="pop_tit">
                        <h3>{popup.adminBannerPopType == "P" ? "PC" : popup.adminBannerPopType == "M" && "Mobile"} 메인 배너 등록</h3>
                        <div className="btn_switch">
                            <input type="checkbox" className="blind" id="switch" 
                                onChange={(e)=>{
                                    const checked = e.currentTarget.checked;
                                    if(checked){
                                        setUseBtn("Y");
                                    }else{
                                        setUseBtn("N");
                                    }
                                }}
                                checked={useBtn == "Y" ? true : false} 
                            />
                            <label htmlFor="switch">노출토글</label>
                            <span>노출</span>
                        </div>
                    </div>
                    <div className="pop_con">
                        <div className="con_box">
                            <div className="form_pop_inner">
                                <div className="form_inner">
                                    <div className="form_box">
                                        <div className="form_input">
                                            <h6>제목 <i>*</i></h6>
                                            <div className="input_wrap">
                                                <InputBox 
                                                    type={`text`}
                                                    placeholder={`배너 제목을 입력해주세요.`}
                                                    value={info.b_title || ""}
                                                    onChangeHandler={onInputChangeHandler}
                                                    id={`b_title`}
                                                    className={error.b_title ? "wrong_input" : ""}
                                                />
                                                {error.b_title && <em className="txt_err">배너 제목을 입력해주세요.</em>}
                                            </div>
                                        </div>
                                        <div className="form_input">
                                            <h6>기간</h6>
                                            <div className="input_wrap">
                                                <div className="search_date">
                                                    <InputDatepicker 
                                                        selectedDate={startDate} 
                                                        ChangeHandler={(date)=>setStartDate(date)} 
                                                        txt={`시작일`}
                                                    />
                                                    <em>~</em>
                                                    <InputDatepicker 
                                                        selectedDate={endDate} 
                                                        ChangeHandler={(date)=>setEndDate(date)} 
                                                        txt={`종료일`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_box">
                                        <div className="form_input">
                                            <h6>배너 노출 사이즈 <i>*</i><b>권장 : 1920 * 520 px</b></h6>
                                            <div className="input_wrap input_wrap2">
                                                <InputBox2 
                                                    type={`text`}
                                                    value={info.b_width_size || ""}
                                                    onChangeHandler={onInputChangeHandler}
                                                    id={`b_width_size`}
                                                    numberOnly={true}
                                                    txt={`가로`}
                                                />
                                                <InputBox2 
                                                    type={`text`}
                                                    value={info.b_height_size || ""}
                                                    onChangeHandler={onInputChangeHandler}
                                                    id={`b_height_size`}
                                                    numberOnly={true}
                                                    txt={`세로`}
                                                />
                                            </div>
                                            {(error.b_width_size || error.b_height_size) && <em className="txt_err">배너 노출 사이즈를 입력해주세요.</em>}
                                        </div>
                                        <div className="form_input">
                                            <h6> </h6>
                                            <div className="input_wrap">
                                                <div className="chk_rdo_wrap">
                                                    <div className="rdo_box1">
                                                        <input type="radio" id="check_size1" className="blind"
                                                            onChange={(e)=>{
                                                                const checked = e.currentTarget.checked;
                                                                if(checked){
                                                                    setSizeCheck("1");
                                                                }else{
                                                                    setSizeCheck("");
                                                                }
                                                            }}
                                                            checked={sizeCheck == "1" ? true : false}
                                                            name="check_size"
                                                        />
                                                        <label htmlFor="check_size1">커버</label>
                                                    </div>
                                                    <div className="rdo_box1">
                                                        <input type="radio" id="check_size2" className="blind"
                                                            onChange={(e)=>{
                                                                const checked = e.currentTarget.checked;
                                                                if(checked){
                                                                    setSizeCheck("2");
                                                                }else{
                                                                    setSizeCheck("");
                                                                }
                                                            }}
                                                            checked={sizeCheck == "2" ? true : false}
                                                            name="check_size"
                                                        />
                                                        <label htmlFor="check_size2">원본 사이즈 고정</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div className="category_con">
                            <h4>카테고리 종류 <i>*</i></h4>
                            <div className="tab_wrap">
                                <ul className="tab_type1">
                                    <li className={tab == '1' ? "on" : ""}>
                                        <button type="button" onClick={()=>setTab('1')}>이미지</button>
                                    </li>
                                    <li className={tab == '2' ? "on" : ""}>
                                        <button type="button" onClick={()=>setTab('2')}>동영상</button>
                                    </li>
                                    <li className={tab == '3' ? "on" : ""}>
                                        <button type="button" onClick={()=>setTab('3')}>HTML</button>
                                    </li>
                                </ul>
                                <div className="tab_con_wrap">
                                    <div className="tab_con">
                                        {tab == '1' || tab == '2' ? //카테고리 종류가 이미지 or 동영상일때
                                            <div className="tab_inner">
                                                <div className="form_pop_inner">
                                                    <div className="form_inner">

                                                        {/* 카테고리종류 동영상일때만 노출 */}
                                                        {tab == '2' &&
                                                            <div className="form_box form_box2">
                                                                <div className="form_input">
                                                                    <h6>동영상 업로드</h6>
                                                                    <div className="input_wrap">
                                                                        <div className="chk_rdo_wrap">
                                                                            <div className="rdo_box1">
                                                                                <input type="radio" id="check_mov_type1" className="blind"
                                                                                    onChange={(e)=>{
                                                                                        const checked = e.currentTarget.checked;
                                                                                        if(checked){
                                                                                            setMovTypeCheck("1");
                                                                                        }else{
                                                                                            setMovTypeCheck("");
                                                                                        }
                                                                                    }}
                                                                                    checked={movTypeCheck == "1" ? true : false}
                                                                                    name="check_mov_type"
                                                                                />
                                                                                <label htmlFor="check_mov_type1">직접 업로드</label>
                                                                            </div>
                                                                            <div className="rdo_box1">
                                                                                <input type="radio" id="check_mov_type2" className="blind"
                                                                                    onChange={(e)=>{
                                                                                        const checked = e.currentTarget.checked;
                                                                                        if(checked){
                                                                                            setMovTypeCheck("2");
                                                                                        }else{
                                                                                            setMovTypeCheck("");
                                                                                        }
                                                                                    }}
                                                                                    checked={movTypeCheck == "2" ? true : false}
                                                                                    name="check_mov_type"
                                                                                />
                                                                                <label htmlFor="check_mov_type2">URL 입력</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                        {tab == '2' && movTypeCheck == '2' ? //카테고리종류 동영상 && 동영상url 입력선택시 노출
                                                            <div className="form_box form_box2">
                                                                <div className="form_input">
                                                                    <h6>동영상 URL</h6>
                                                                    <div className="input_wrap">
                                                                        <InputBox 
                                                                            type={`text`}
                                                                            placeholder={`URL을 입력해주세요.`}
                                                                            value={info.b_mov_url || ""}
                                                                            onChangeHandler={onInputChangeHandler}
                                                                            id={`b_mov_url`}
                                                                            className={error.b_mov_url ? "wrong_input" : ""}
                                                                        />
                                                                        {error.b_mov_url && <em className="txt_err">동영상 URL을 입력해주세요.</em>}
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                            :
                                                            <div className="form_box form_box2">
                                                                <div className="form_input">
                                                                    <h6>배너 파일 선택</h6>
                                                                    <div className="input_wrap">
                                                                        <div className="file_box1">
                                                                            <div {...getRootProps1({className: 'dropzone'})}>
                                                                                <div className={`input_file${error.b_file ? " wrong_input" : ""}`}>
                                                                                    <input {...getInputProps1({className: 'blind'})} />
                                                                                    <label>
                                                                                        {bannerFile == null && <b>파일을 마우스로 끌어 오세요.</b>}
                                                                                        <strong>파일선택</strong>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            {bannerFile != null &&
                                                                                <ul className="file_txt">
                                                                                    <li>
                                                                                        <span>{bannerFile}</span>
                                                                                        <button type="button" className="btn_file_remove" 
                                                                                            onClick={bannerFileDeltHandler}
                                                                                        >파일삭제</button>
                                                                                    </li>
                                                                                </ul>
                                                                            }
                                                                            {bannerFileThumb &&
                                                                                <div className="view_file_img">
                                                                                    <div className="file_img">
                                                                                        {tab == '1' ? <img src={bannerFileThumb.preview} alt="배너이미지"/>
                                                                                            : tab == '2' && <video src={bannerFileThumb.preview} controls />
                                                                                        }
                                                                                        <button type="button" className="btn_img_remove"
                                                                                            onClick={bannerFileDeltHandler}
                                                                                        >이미지 삭제</button>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                        {error.b_file && <em className="txt_err">배너 파일을 첨부해주세요.</em>}
                                                                    </div>
                                                                </div>
                                                            </div>  
                                                        }
                                                        <div className="form_box">
                                                            <div className="form_input">
                                                                <h6>배너 링크</h6>
                                                                <div className="input_wrap">
                                                                    <InputBox 
                                                                        type={`text`}
                                                                        placeholder={`배너 링크 정보를 넣어주세요.`}
                                                                        value={info.b_url || ""}
                                                                        onChangeHandler={onInputChangeHandler}
                                                                        id={`b_url`}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form_input">
                                                                <h6>링크 열림창</h6>
                                                                <div className="input_wrap">
                                                                    <div className="chk_rdo_wrap">
                                                                        <div className="rdo_box1">
                                                                            <input type="radio" id="check_link1" className="blind"
                                                                                onChange={(e)=>{
                                                                                    const checked = e.currentTarget.checked;
                                                                                    if(checked){
                                                                                        setLinkCheck("1");
                                                                                    }else{
                                                                                        setLinkCheck("");
                                                                                    }
                                                                                }}
                                                                                checked={linkCheck == "1" ? true : false}
                                                                                name="check_link"
                                                                            />
                                                                            <label htmlFor="check_link1">부모창</label>
                                                                        </div>
                                                                        <div className="rdo_box1">
                                                                            <input type="radio" id="check_link2" className="blind"
                                                                                onChange={(e)=>{
                                                                                    const checked = e.currentTarget.checked;
                                                                                    if(checked){
                                                                                        setLinkCheck("2");
                                                                                    }else{
                                                                                        setLinkCheck("");
                                                                                    }
                                                                                }}
                                                                                checked={linkCheck == "2" ? true : false}
                                                                                name="check_link"
                                                                            />
                                                                            <label htmlFor="check_link2">새창</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* 카테고리종류 동영상일때만 노출 */}
                                                        {tab == '2' &&
                                                            <div className="form_box">
                                                                <div className="form_input">
                                                                    <h6>자동 재생</h6>
                                                                    <div className="input_wrap">
                                                                        <div className="chk_rdo_wrap chk_rdo_wrap2">
                                                                            <div className="chk_box1">
                                                                                <input type="checkbox" id="check_mov_play" className="blind" 
                                                                                    onChange={(e)=>{
                                                                                        const checked = e.currentTarget.checked;
                                                                                        onCheckChangeHandler(checked,"b_mov_play",'Y');
                                                                                    }}
                                                                                    checked={info.b_mov_play && info.b_mov_play == 'Y' ? true : false}
                                                                                />
                                                                                <label htmlFor="check_mov_play">체크 시 동영상 배너 자동 재생</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form_input">
                                                                    <h6>소리 재생</h6>
                                                                    <div className="input_wrap">
                                                                        <div className="chk_rdo_wrap chk_rdo_wrap2">
                                                                            <div className="chk_box1">
                                                                                <input type="checkbox" id="check_mov_sound" className="blind" 
                                                                                    onChange={(e)=>{
                                                                                        const checked = e.currentTarget.checked;
                                                                                        onCheckChangeHandler(checked,"b_mov_sound",'Y');
                                                                                    }}
                                                                                    checked={info.b_mov_sound && info.b_mov_sound == 'Y' ? true : false}
                                                                                />
                                                                                <label htmlFor="check_mov_sound">체크 시 동영상 배너 소리 재생</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            : tab == '3' && //카테고리 종류가 HTML일때
                                            <div className="tab_wrap">
                                                <ul className="tab_type2">
                                                    {htmlTabList.map((cont,i)=>{
                                                        return(
                                                            <li key={i} className={htmlTab === i+1 ? "on" : ""}>
                                                                <button type="button" onClick={()=>setHtmlTab(i+1)}>{cont}</button>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                                <div className="tab_inner">
                                                    {htmlTab === 1 ?
                                                        <div className="edit_box">
                                                            <Editor 
                                                                value={content}
                                                                onChangeHandler={onEditorChangeHandler}
                                                                onClickRaw={handleClickShowRaw}
                                                                btnHtmlOn={showRaw}
                                                            />
                                                            {showRaw ? 
                                                                <textarea
                                                                    value={rawHtml}
                                                                    onChange={(e) => {
                                                                        const val = e.currentTarget.value;
                                                                        setRawHtml(val);

                                                                        //배너html 내용 에러문구 false
                                                                        if(val.length > 0){
                                                                            let newError = { ...error };
                                                                            newError.b_content = false;
                                                                            setError(newError);
                                                                        }
                                                                    }}
                                                                    className="raw_editor"
                                                                />
                                                                : null  
                                                            }
                                                        </div>
                                                        :<textarea 
                                                            style={{height:"350px"}}
                                                            value={templateText || ""}
                                                            onChange={(e)=>{
                                                                const val = e.currentTarget.value;
                                                                setTemplateText(val);

                                                                //배너html 내용 에러문구 false
                                                                if(val.length > 0){
                                                                    let newError = { ...error };
                                                                    newError.b_content = false;
                                                                    setError(newError);
                                                                }
                                                            }}
                                                        />
                                                    }
                                                </div>
                                                {error.b_content && <em className="txt_err">내용을 입력해주세요.</em>}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pop_btn_wrap">
                            <button type="button" className="btn_left" onClick={deltBtnClickHandler}>배너 삭제</button>
                            <div className="btn_box">
                                <button type="button" className="btn_type3" onClick={closeBtnClickHandler}>취소</button>
                                <button type="button" className="btn_type4" onClick={saveBtnClickHandler}>저장</button>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn_pop_close" onClick={closeBtnClickHandler}>팝업닫기</button>
                </div>
            </div>
        </div>

        {/* 닫기,취소 confirm팝업 */}
        {closeConfirm && <ConfirmPop onClickHandler={closePopHandler} />}

        {/* 저장완료 confirm팝업 */}
        {saveOkConfirm && <ConfirmPop closePop="custom" onCloseHandler={saveOkHandler} />}

        {/* 삭제 confirm팝업 */}
        {deltConfirm && <ConfirmPop onClickHandler={deltHandler} />}

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default BannerPop;