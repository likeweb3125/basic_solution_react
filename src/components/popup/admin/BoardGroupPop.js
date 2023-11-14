import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { adminBoardGroupPop, confirmPop, adminBoardGroupPopMenuOn } from "../../../store/popupSlice";
import ConfirmPop from "../../popup/ConfirmPop";
import BoardGroupMenu from "../../component/admin/BoardGroupMenu";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const NotiPop = (props) => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const board_group_list = enum_api_uri.board_group_list;
    const board_group_view = enum_api_uri.board_group_view;
    const board_group = enum_api_uri.board_group;
    const [confirm, setConfirm] = useState(false);
    const [closeConfirm, setCloseConfirm] = useState(false);
    const [deltConfirm, setDeltConfirm] = useState(false);
    const [modifyOkConfirm, setModifyOkConfirm] = useState(false);
    const [addOkConfirm, setAddOkConfirm] = useState(false);

    const [list, setList] = useState([]);
    const [info, setInfo] = useState({});

    const [allCheck, setAllCheck] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [uiCheck, setUiCheck] = useState("");
    const [menuOnImg, setMenuOnImg] = useState(null);
    const [menuOnImgData, setMenuOnImgData] = useState(null);
    const [menuOffImg, setMenuOffImg] = useState(null);
    const [menuOffImgData, setMenuOffImgData] = useState(null);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
            setCloseConfirm(false);
            setDeltConfirm(false);
            setModifyOkConfirm(false);
            setAddOkConfirm(false);
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
        dispatch(adminBoardGroupPop({adminBoardGroupPop:false,adminBoardGroupPopId:null}));
    };


    //분류리스트 가져오기
    const getList = () => {
        axios.get(`${board_group_list.replace(":parent_id",popup.adminBoardGroupPopId)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                const newList = data.filter((item)=>item.g_num !== "0"); //숨긴분류 제외
                setList(newList);
                // setAllCheck(res.data.all_board);
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
        getList();
    },[]);


    //분류정보 가져오기
    const getData = () => {
        axios.get(`${board_group_view.replace(":id",popup.adminBoardGroupPopMenuOn)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;
                setInfo(data);
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


    //선택한 분류값이 달라질때마다 분류정보 가져오기
    useEffect(()=>{
        if(popup.adminBoardGroupPopMenuOn !== null){
            getData();
        }else{
            setInfo({});
        }
    },[popup.adminBoardGroupPopMenuOn])



    useEffect(()=>{
        if(Object.keys(info).length > 0){
            setNameInput(info.g_name);
            setUiCheck(info.g_menu_ui);
            setMenuOnImg(info.g_img_on);
            setMenuOffImg(info.g_img_off);
        }else{
            setNameInput("");
            setUiCheck("");
            setMenuOnImg(null);
            setMenuOnImgData(null);
            setMenuOffImg(null);
            setMenuOffImgData(null);
        }
    },[info]);
       

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


    //분류리스트 드래그앤드롭-----------------------------
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
              distance: 5,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
              distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event) => {
        const {active, over} = event;

        if (active.id !== over.id) {
            setList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }


    //게시판분류정보 등록버튼 클릭시
    const enterBtnClickHandler = () => {
        if(!nameInput){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'분류명을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(!uiCheck){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'메뉴 UI를 선택해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(uiCheck == "IMG" && !menuOnImg){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'메뉴의 ON 이미지를 등록해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(uiCheck == "IMG" && !menuOffImg){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'메뉴의 OFF 이미지를 등록해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else{
            // 새로생성일때
            if(popup.adminBoardGroupPopMenuOn === null){
                groupAddHandler();
            }
            //수정일때
            else{
                groupModifyHandler();
            }
        }
    };


    //분류추가하기
    const groupAddHandler = () => {
        const formData = new FormData();
        formData.append("parent_id", popup.adminBoardGroupPopId);
        // formData.append("g_num", "");
        // formData.append("all_board", allCheck);
        formData.append("g_name", nameInput);
        formData.append("g_menu_ui", uiCheck);
        formData.append("g_img_on", menuOnImgData);
        formData.append("g_img_off", menuOffImgData);
        formData.append("use_yn", "Y");

        axios.post(board_group, formData,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                getList();

                setInfo({});

                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt:'등록되었습니다.',
                    confirmPopBtn:1,
                }));
                setAddOkConfirm(true);
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


    //분류수정하기
    const groupModifyHandler = () => {
        const formData = new FormData();
        formData.append("parent_id", popup.adminBoardGroupPopId);
        formData.append("g_num", popup.adminBoardGroupPopMenuOn);
        // formData.append("all_board", allCheck);
        formData.append("g_name", nameInput);
        formData.append("g_menu_ui", uiCheck);
        formData.append("g_img_on", menuOnImgData);
        formData.append("g_img_off", menuOffImgData);
        formData.append("use_yn", "Y");

        axios.put(board_group, formData,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                getList();

                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt:'수정되었습니다.',
                    confirmPopBtn:1,
                }));
                setModifyOkConfirm(true);
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


    //분류삭제버튼 클릭시
    const deltBtnClickHandler = () => {
        //선택한 분류가 없을때
        if(popup.adminBoardGroupPopMenuOn === null){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'삭제할 분류를 선택해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else{
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'선택한 분류를 삭제하시겠습니까?',
                confirmPopBtn:2,
            }));
            setDeltConfirm(true);
        }
    };


    //분류삭제하기
    const deltHandler = () => {
        const body = {
            id: popup.adminBoardGroupPopMenuOn,
        };
        axios.delete(board_group,
            {
                data: body,
                headers: {Authorization: `Bearer ${user.loginUser.accessToken}`}
            }
        )
        .then((res)=>{
            if(res.status === 200){
                getList();
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
        <div className="pop_display pop_board_category">
            <div className="dimm"></div>
            <div className="popup_wrap">
                <div className="popup">
                    <div className="pop_tit">
                        <h3>게시판 분류</h3>
                        <div className="tit_txt">
                            <em>문의 게시판</em>
                            <p>※ 정보수정 시 저장 버튼을 눌러 변경된 정보를 꼭 저장해 주세요.</p>
                        </div>
                    </div>
                    <div className="pop_con">
                        <div className="con_box">
                            <div className="form_pop_inner">
                                <div className="form_inner">
                                    <div className="form_box form_box2">
                                        <div className="form_input">
                                            <h6>전체 분류 사용</h6>
                                            <div className="input_wrap">
                                                <div className="chk_box1">
                                                    <input type="checkbox" id="chkPop11" className="blind"
                                                        onChange={(e)=>{
                                                            const checked = e.currentTarget.checked;
                                                            if(checked){
                                                                setAllCheck("Y");
                                                            }else{
                                                                setAllCheck("");
                                                            }
                                                        }}
                                                        checked={allCheck == "Y" ? true : false}
                                                    />
                                                    <label htmlFor="chkPop11">체크 시 해당 게시판에 등록한 게시글을 모두 볼 수 있는 전체 게시판 분류 사용</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="con_box">
                            <div className="classification_box">
                                <div className="menu_list_wrap">
                                    <div className="btn_util">
                                        <div className="add_wrap">
                                            <button type="button" className="btn_type5"
                                                onClick={()=>{
                                                    dispatch(adminBoardGroupPopMenuOn(null));
                                                }}
                                            >분류 추가</button>
                                        </div>
                                        <button type="button" className="btn_type7" onClick={deltBtnClickHandler}>삭제</button>
                                    </div>
                                    <div className="menu_list_box">
                                        <ul className="list_menu1">
                                            <DndContext
                                                sensors={sensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <SortableContext
                                                    items={list.map((menu) => menu.id)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    {list.map((cont,i)=>{
                                                        return(
                                                            <BoardGroupMenu 
                                                                key={i}
                                                                data={cont} 
                                                                id={cont.id}
                                                            />
                                                        );
                                                    })}
                                                </SortableContext>
                                            </DndContext>
                                        </ul>
                                        {/* <div className="disable_menu_wrap">
                                            <button type="button" className="btn_disable_menu">숨긴 분류 (10)</button>
                                            <div className="disable_menu">
                                                <ul className="list_disable_menu">
                                                    <li>
                                                        <div className="menu menu1">
                                                            <span>안쓰는 1차 카테고리 01</span>
                                                            <div className="btn_wrap">
                                                                <button type="button" className="btn_move">카테고리 이동</button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                                        <p>* 드래그앤드랍으로 순서를 변경할 수 있습니다.</p>
                                    </div>
                                    <div className="btn_util">
                                        <div className="add_wrap">
                                            <button type="button" className="btn_type5" 
                                                onClick={()=>{
                                                    dispatch(adminBoardGroupPopMenuOn(null));
                                                }}
                                            >분류 추가</button>
                                        </div>
                                        <button type="button" className="btn_type7" onClick={deltBtnClickHandler}>삭제</button>
                                    </div>
                                </div>
                                <div className="reg_category">
                                    <h4>게시판 분류</h4>
                                    <div className="form_pop_inner">
                                        <div className="form_inner">
                                            <div className="form_box form_box2 form_border_box">
                                                <div className="form_input">
                                                    <h6>분류명 <i>*</i></h6>
                                                    <div className="input_wrap">
                                                        <div className="input_box">
                                                            <input type="text" placeholder="게시판 분류명을 입력해주세요."
                                                                value={nameInput}
                                                                onChange={(e)=>{
                                                                    const val = e.currentTarget.value;
                                                                    setNameInput(val);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form_box form_box2">
                                                <div className="form_input">
                                                    <h6>메뉴 UI <i>*</i></h6>
                                                    <div className="input_wrap">
                                                        <div className="chk_rdo_wrap">
                                                            <div className="rdo_box1">
                                                                <input type="radio" id="ui_check_1" className="blind"
                                                                    onChange={(e)=>{
                                                                        const checked = e.currentTarget.checked;
                                                                        if(checked){
                                                                            setUiCheck("TEXT");
                                                                        }else{
                                                                            setUiCheck("");
                                                                        }
                                                                    }}
                                                                    checked={uiCheck == "TEXT" ? true : false}
                                                                    name="uiCheck"
                                                                />
                                                                <label htmlFor="ui_check_1">텍스트</label>
                                                            </div>
                                                            <div className="rdo_box1">
                                                                <input type="radio" id="ui_check_2" className="blind"
                                                                    onChange={(e)=>{
                                                                        const checked = e.currentTarget.checked;
                                                                        if(checked){
                                                                            setUiCheck("IMG");
                                                                        }else{
                                                                            setUiCheck("");
                                                                        }
                                                                    }}
                                                                    checked={uiCheck == "IMG" ? true : false}
                                                                    name="uiCheck"
                                                                />
                                                                <label htmlFor="ui_check_2">이미지</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form_input">
                                                    <h6>이미지 ON</h6>
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
                                                    <h6>이미지 OFF</h6>
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
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_btn_wrap">
                                        <button type="button" className="btn_type1">취소</button>
                                        <button type="button" className="btn_type2" onClick={enterBtnClickHandler}>{popup.adminBoardGroupPopMenuOn === null ? "등록" : "수정"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form_btn_wrap">
                            <button type="button" className="btn_type3" onClick={closeBtnClickHandler}>취소</button>
                            <button type="button" className="btn_type4">저장</button>
                        </div>
                    </div>
                    <button type="button" className="btn_pop_close" onClick={closeBtnClickHandler}>팝업닫기</button>
                </div>
            </div>
        </div>

        {/* 분류추가완료 confirm팝업 */}
        {addOkConfirm && <ConfirmPop closePop="custom" onCloseHandler={()=>setAddOkConfirm(false)} />}

        {/* 분류수정완료 confirm팝업 */}
        {modifyOkConfirm && <ConfirmPop closePop="custom" onCloseHandler={()=>setModifyOkConfirm(false)} />}

        {/* 분류삭제 confirm팝업 */}
        {deltConfirm && <ConfirmPop onClickHandler={deltHandler} />}

        {/* 닫기,취소 confirm팝업 */}
        {closeConfirm && <ConfirmPop onClickHandler={closePopHandler} />}

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default NotiPop;