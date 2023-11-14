import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { adminCategoryPop, confirmPop , adminCategoryPopData, adminCategoryPopModify } from "../../../store/popupSlice";
import ConfirmPop from "../../popup/ConfirmPop";
import InputBox from "../../component/admin/InputBox";
import CategoryPopCont1 from "../../component/admin/CategoryPopCont1";
import CategoryPopCont2 from "../../component/admin/CategoryPopCont2";
import CategoryPopCont3 from "../../component/admin/CategoryPopCont3";
import CategoryPopCont4 from "../../component/admin/CategoryPopCont4";
import CategoryPopCont5 from "../../component/admin/CategoryPopCont5";
import CategoryPopCont6 from "../../component/admin/CategoryPopCont6";
import CategoryPopCont7 from "../../component/admin/CategoryPopCont7";


const CategoryPop = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const menu_sub_detail = enum_api_uri.menu_sub_detail;
    const menu_sub = enum_api_uri.menu_sub;
    const [confirm, setConfirm] = useState(false);
    const [closeConfirm, setCloseConfirm] = useState(false);
    const [saveConfirm, setSaveConfirm] = useState(false);
    const [info, setInfo] = useState({});
    const [error, setError] = useState({});
    const [menuUi, setMenuUi] = useState("");
    const [titImg, setTitImg] = useState(null);
    const [titImgData, setTitImgData] = useState(null);
    const [menuOnImg, setMenuOnImg] = useState(null);
    const [menuOnImgData, setMenuOnImgData] = useState(null);
    const [menuOffImg, setMenuOffImg] = useState(null);
    const [menuOffImgData, setMenuOffImgData] = useState(null);
    const [tabList, setTabList] = useState(["HTML","빈 메뉴","고객맞춤","일반 게시판","갤러리 게시판","FAQ","문의게시판"]);
    const [tab, setTab] = useState(1);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
            setCloseConfirm(false);
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
        dispatch(adminCategoryPop({adminCategoryPop:false,adminCategoryPopIdx:null}));
        dispatch(adminCategoryPopData({}));
    };


    //상세정보 가져오기
    const getData = () => {
        axios.get(`${menu_sub_detail.replace(":id",popup.adminCategoryPopIdx)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                    data.c_menu_ui = data.c_menu_ui[0];
                    data.c_content_type = data.c_content_type[0];
                setInfo(data);

                if(data.c_main_banner_file){
                    setTitImg(data.c_main_banner_file);
                }
                if(data.c_menu_on_img){
                    setMenuOnImg(data.c_menu_on_img);
                }
                if(data.c_menu_off_img){
                    setMenuOffImg(data.c_menu_off_img);
                }

                setMenuUi(data.c_menu_ui);
                setTab(data.c_content_type);
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


    //맨처음 
    useEffect(()=>{
        //하위카테고리 새로등록이 아닐때만 상세정보 가져오기
        if(!popup.adminCategoryPopAdd){
            getData();
        }
    },[]);


    useEffect(()=>{
        //카테고리 값 변경시 adminCategoryPopData store 에 저장
        dispatch(adminCategoryPopData(info));

        console.log(info);
    },[info]);

    
    //카테고리 종류 탭 변경시 info 값 변경
    useEffect(()=>{
        let newInfo = {...info};
            newInfo.c_content_type = tab;
            
        setInfo(newInfo);
    },[tab]);
    

    //인풋값 변경시
    const onInputChangeHandler = (e) => {
        const id = e.currentTarget.id;
        const val = e.currentTarget.value;

        let newInfo = {...info};
            newInfo[id] = val;
            
        setInfo(newInfo);

        if(id == "p_title" && val.length > 0){
            let newError = {...error};
                newError.p_title = false;
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


    useEffect(()=>{
        // console.log(popup.adminCategoryPopData);
    },[popup.adminCategoryPopData]);

    
    // 카테고리 제목이미지 등록
    const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
            setTitImg(acceptedFiles[0].name);
            setTitImgData(acceptedFiles);
        }
    });

    // 메뉴 이미지 On 등록
    const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
            setMenuOnImg(acceptedFiles[0].name);
            setMenuOnImgData(acceptedFiles);
        }
    });

    // 메뉴 이미지 OFF 등록
    const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
            setMenuOffImg(acceptedFiles[0].name);
            setMenuOffImgData(acceptedFiles);
        }
    });

    useEffect(()=>{
        let newData = {...info};
        if(titImgData != null){
            titImgData.forEach((file) => {
                newData.c_main_banner_file = file;
            });
        }else if(titImgData ==  null || titImg == null){
            newData.c_main_banner_file = null;
        }
        setInfo(newData);
    },[titImgData, titImg]);


    useEffect(()=>{
        let newData = {...info};
        if(menuOnImgData != null){
            menuOnImgData.forEach((file) => {
                newData.c_menu_on_img = file;
            });
        }else if(menuOnImgData ==  null || menuOnImg == null){
            newData.c_menu_on_img = null;
        }
        setInfo(newData);
    },[menuOnImgData,menuOnImg]);



    useEffect(()=>{
        let newData = {...info};
        if(menuOffImgData != null){
            menuOffImgData.forEach((file) => {
                newData.c_menu_off_img = file;
            });
        }else if(menuOffImgData ==  null || menuOffImg == null){
            newData.c_menu_off_img = null;
        }
        setInfo(newData);
    },[menuOffImgData,menuOffImg]);



    //저장버튼 클릭시 필수입력 체크 (카테고리명, 메뉴UI, 카테고리종류)
    const saveBtnClickHandler = () => {
        if(!info.c_name){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: '카테고리 명을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(!info.c_menu_ui){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: '메뉴 UI 선택해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(info.c_menu_ui == "IMG" && menuOnImg == null){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: '메뉴 ON 이미지를 등록해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(info.c_menu_ui == "IMG" && menuOffImg == null){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: '메뉴 OFF 이미지를 등록해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else{
            saveHandler();
        }
    };


    //저장하기
    const saveHandler = () => {
        const body = popup.adminCategoryPopData;
        const formData = new FormData();

        // 객체를 순회하며 모든 속성을 formData에 추가
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                const value = body[key];
                formData.append(key, value);
            }
        }

        formData.append("use_yn", "Y");

        axios.put(menu_sub, formData, {
            headers: {
                Authorization: `Bearer ${user.loginUser.accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res)=>{
            if(res.status === 200){
                dispatch(adminCategoryPopModify(true));
                closePopHandler();
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
        <div className="pop_display pop_reg_category">
            <div className="dimm"></div>
            <div className="popup_wrap">
                <div className="popup">
                    <div className="pop_tit">
                        <h3>하위 카테고리</h3>
                        <div className="tit_txt">
                            <p>※ 정보수정 시 저장 버튼을 눌러 변경된 정보를 꼭 저장해 주세요.</p>
                        </div>
                    </div>
                    <div className="pop_con">
                        <div className="con_box">
                            <div className="form_pop_inner">
                                <div className="form_inner">
                                    <div className="form_box">
                                        <div className="form_input">
                                            <h6>카테고리 명 <i>*</i></h6>
                                            <div className="input_wrap">
                                                <InputBox 
                                                    type={`text`}
                                                    placeholder={`카테고리 명을 입력해주세요.`}
                                                    value={info.c_name || ""}
                                                    onChangeHandler={onInputChangeHandler}
                                                    id={`c_name`}
                                                    className={error.c_name ? "wrong_input" : ""}
                                                />
                                                {error.c_name && <em className="txt_err">카테고리 명을 입력해주세요.</em>}
                                            </div>
                                        </div>
                                        <div className="form_input">
                                            <h6>메뉴 UI <i>*</i></h6>
                                            <div className="input_wrap">
                                                <div className="chk_rdo_wrap">
                                                    <div className="rdo_box1">
                                                        <input type="radio" id="check_ui_1" className="blind"
                                                            onChange={(e)=>{
                                                                const checked = e.currentTarget.checked;
                                                                onCheckChangeHandler(checked,"c_menu_ui","TXT");
                                                            }}
                                                            checked={info.c_menu_ui && info.c_menu_ui == "TXT" ? true : false}
                                                            name="menuUi"
                                                        />
                                                        <label htmlFor="check_ui_1">텍스트</label>
                                                    </div>
                                                    <div className="rdo_box1">
                                                        <input type="radio" id="check_ui_2" className="blind"
                                                            onChange={(e)=>{
                                                                const checked = e.currentTarget.checked;
                                                                onCheckChangeHandler(checked,"c_menu_ui","IMG");
                                                            }}
                                                            checked={info.c_menu_ui && info.c_menu_ui == "IMG" ? true : false}
                                                            name="menuUi"
                                                        />
                                                        <label htmlFor="check_ui_2">이미지</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_box form_box3">
                                        <div className="form_input">
                                            <h6>카테고리 제목 이미지</h6>
                                            <div className="input_wrap">
                                                <div className="file_box1">
                                                    <div {...getRootProps1({className: 'dropzone'})}>
                                                        <div className="input_file">
                                                            <input {...getInputProps1({className: 'blind'})} />
                                                            <label>
                                                                {titImg == null && <b>파일을 마우스로 끌어 오세요.</b>}
                                                                <strong>파일선택</strong>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {titImg != null &&
                                                        <ul className="file_txt">
                                                            <li>
                                                                <span>{titImg}</span>
                                                                <button type="button" className="btn_file_remove" 
                                                                    onClick={()=>{
                                                                        setTitImg(null);
                                                                        setTitImgData(null);
                                                                    }}
                                                                >파일삭제</button>
                                                            </li>
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* 메뉴 UI 이미지선택시에만 노출 */}
                                        {info.c_menu_ui && info.c_menu_ui.includes("IMG") &&<>
                                            <div className="form_input">
                                                <h6>메뉴 이미지 ON</h6>
                                                <div className="input_wrap">
                                                    <div className="file_box1">
                                                        <div {...getRootProps2({className: 'dropzone'})}>
                                                            <div className="input_file">
                                                                <input {...getInputProps2({className: 'blind'})} />
                                                                <label>
                                                                    {menuOnImg == null && <b>파일을 마우스로 끌어 오세요.</b>}
                                                                    <strong>파일선택</strong>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {menuOnImg != null &&
                                                            <ul className="file_txt">
                                                                <li>
                                                                    <span>{menuOnImg}</span>
                                                                    <button type="button" className="btn_file_remove" 
                                                                        onClick={()=>{
                                                                            setMenuOnImg(null);
                                                                            setMenuOnImgData(null);
                                                                        }}
                                                                    >파일삭제</button>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form_input">
                                                <h6>메뉴 이미지 OFF</h6>
                                                <div className="input_wrap">
                                                    <div className="file_box1">
                                                        <div {...getRootProps3({className: 'dropzone'})}>
                                                            <div className="input_file">
                                                                <input {...getInputProps3({className: 'blind'})} />
                                                                <label>
                                                                    {menuOffImg == null && <b>파일을 마우스로 끌어 오세요.</b>}
                                                                    <strong>파일선택</strong>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {menuOffImg != null &&
                                                            <ul className="file_txt">
                                                                <li>
                                                                    <span>{menuOffImg}</span>
                                                                    <button type="button" className="btn_file_remove" 
                                                                        onClick={()=>{
                                                                            setMenuOffImg(null);
                                                                            setMenuOffImgData(null);
                                                                        }}
                                                                    >파일삭제</button>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div className="category_con">
                            <h4>카테고리 종류 <i>*</i></h4>
                            <div className="tab_wrap">
                                <ul className="tab_type1">
                                    {tabList.map((cont,i)=>{
                                        return(
                                            <li key={i} className={tab === i+1? "on" : ""}>
                                                <button type="button" onClick={()=>setTab(i+1)}>{cont}</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="tab_con_wrap">
                                    {tab === 1 ? <CategoryPopCont1 />
                                        : tab === 2 ? <CategoryPopCont2 info={info} />
                                        : tab === 3 ? <CategoryPopCont3 info={info} />
                                        : tab === 4 ? <CategoryPopCont4 info={info} />
                                        : tab === 5 ? <CategoryPopCont5 info={info} />
                                        : tab === 6 ? <CategoryPopCont6 info={info} />
                                        : tab === 7 && <CategoryPopCont7 info={info} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="pop_btn_wrap">
                            <button type="button" className="btn_left">카테고리 삭제</button>
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

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default CategoryPop;