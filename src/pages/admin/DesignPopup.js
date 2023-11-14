import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop, adminPopupPop ,adminPopupPopWrite, adminPopupPopModify } from "../../store/popupSlice";
import { pageNo, pageNoChange, checkedList } from "../../store/etcSlice";
import SelectBox from "../../components/component/admin/SelectBox";
import SearchInput from "../../components/component/admin/SearchInput";
import TableWrap from "../../components/component/admin/TableWrap";
import ConfirmPop from "../../components/popup/ConfirmPop";
import Pagination from "../../components/component/admin/Pagination";


const DesignPopup = () => {
    const dispatch = useDispatch();
    const popup_list = enum_api_uri.popup_list;
    const popup_open = enum_api_uri.popup_open;

    const common = useSelector((state)=>state.common);
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const etc = useSelector((state)=>state.etc);
    const [confirm, setConfirm] = useState(false);
    const [useConfirm, setUseConfirm] = useState(false);

    const [searchTxt, setSearchTxt] = useState("");
    const [boardData, setBoardData] = useState({});
    const [list, setList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [checkList, setCheckList] = useState([]);
    const [checkedNum, setCheckedNum] = useState(0);
    const [tab, setTab] = useState("P");
    const [showBtn, setShowBtn] = useState(false);
    const [hideBtn, setHideBtn] = useState(false);
    const [use, setUse] = useState("");
    const [firstRender, setFirstRender] = useState(false);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
            setUseConfirm(false);
        }
    },[popup.confirmPop]);


    //게시판정보 가져오기
    const getBoardData = (page, search) => {
        let txt
        if(search){
            txt = "";
        }else{
            txt = searchTxt;
        }

        axios.get(`${popup_list.replace(":limit",limit)}?page=${page ? page : 1}${txt.length > 0 ? "&searchtxt="+txt : ""}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setBoardData(data);

                let pop_list = data.popup_list;
                const pc_list = pop_list.filter((item) => item.p_type[0] === "P");
                const mo_list = pop_list.filter((item) => item.p_type[0] === "M");

                if(tab === "P"){
                    setList(pc_list);
                }else{
                    setList(mo_list); 
                }
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
        if(!firstRender){
            setFirstRender(true);
        }
    },[]);


    //탭 변경시 PC팝업 리스트, MO팝업 리스트 변경
    useEffect(()=>{
        if(firstRender){
            setSearchTxt("");
            getBoardData(1,true);
        }
    },[tab]);


    //limit 값 변경시 게시판정보 가져오기
    useEffect(()=>{
        getBoardData();
    },[limit]);


    //페이지네이션 클릭으로 페이지변경시
    useEffect(()=>{
        if(etc.pageNoChange){
            getBoardData(etc.pageNo);

            dispatch(pageNoChange(false));
        }
    },[etc.pageNo,etc.pageNoChange]);


    //맨처음 리스트 idx값만 배열로 (전체 체크박스리스트 만들기)
    useEffect(()=>{
        const idxList = list.map((item) => item.idx).filter(Boolean);
        setCheckList([...idxList]);
    },[list]);


    //전체선택 체크박스 체크시
    const allCheckHandler = (checked) => {
        if(checked){
            dispatch(checkedList([...checkList]));
        }else{
            dispatch(checkedList([]));
        }
    };


    //체크박스 변경시 
    useEffect(()=>{
        //체크된 수 변경
        const list = boardData.popup_list;
        const list2 = etc.checkedList;
        const num = etc.checkedList.length;
        setCheckedNum(num);

        //체크된 리스트에 따라 노출,중단 버튼 on,off
        if(list && list2){
            const newList = list.filter((item)=>list2.includes(item.idx));
            const hasYValue = newList.some(item => item.p_open[0] === "Y");
            const hasNValue = newList.some(item => item.p_open[0] === "N");
            if(hasYValue){
                setHideBtn(true);
            }else{
                setHideBtn(false);
            }
            if(hasNValue){
                setShowBtn(true);
            }else{
                setShowBtn(false);
            }
        }
    },[etc.checkedList]);


    //노출,중단버튼 클릭시
    const btnClickHandler = (use) => {
        let txt = "";
        if(use){
            txt = "노출";
            setUse("Y");
        }else{
            txt = "중단";
            setUse("N");
        }
        dispatch(confirmPop({
            confirmPop:true,
            confirmPopTit:'알림',
            confirmPopTxt: '해당 운영정책을 '+ txt +'하시겠습니까?',
            confirmPopBtn:2,
        }));
        setUseConfirm(true);
    };


    //팝업 노출,중단하기
    const useHandler = () => {
        const body = {
            idx:etc.checkedList,
            p_open:use
        };
        axios.post(popup_open, body, 
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                getBoardData();
                dispatch(checkedList([]));
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


    //팝업 변경시 게시판리스트정보 가져오기
    useEffect(()=>{
        if(popup.adminPopupPopModify){
            dispatch(adminPopupPopModify(false));
            getBoardData();
        }
    },[popup.adminPopupPopModify]);


    //팝업등록 버튼클릭시
    const writeBtnClickHandler = () => {
        dispatch(adminPopupPopWrite(true));
        dispatch(adminPopupPop({adminPopupPop:true,adminPopupPopIdx:null,adminPopupPopType:tab}));
    };


    return(<>
        <div className="page_admin_design">
            <div className="top_txt">
                <strong>팝업 등록시 노출될 기기와 이미지 사이즈, 팝업 이미지가 들어갈 자리를 고려하여 등록해주세요.</strong>
                <button type="button" className="btn_type15" onClick={writeBtnClickHandler}>팝업 등록</button>
            </div>
            <div className="content_box">
                <ul className="tab_type3">
                    <li className={tab === "P" ? "on" : ""}>
                        <button type="button" onClick={()=>setTab("P")}>
                            <span>PC</span>
                        </button>
                    </li>
                    <li className={tab === "M" ? "on" : ""}>
                        <button type="button" onClick={()=>setTab("M")}>
                            <span>Mobile</span>
                        </button>
                    </li>
                </ul>
                <div className="board_section">
                    <div className="form_search_wrap">
                        <div className="search_wrap">
                            <SelectBox 
                                class="select_type3 search_row_select"
                                list={[10,15,30,50]}
                                selected={limit}
                                onChangeHandler={(e)=>{
                                    const val = e.currentTarget.value;
                                    setLimit(val);
                                }}
                                selHidden={true}
                                limitSel={true}
                            />
                            <div className="search_box">
                                <SearchInput 
                                    placeholder="검색어를 입력해주세요."
                                    onChangeHandler={(e)=>{
                                        const val = e.currentTarget.value;
                                        setSearchTxt(val);
                                    }}
                                    value={searchTxt}
                                    onSearchHandler={()=>getBoardData()}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="board_table_util">
                        <div className="chk_area">
                            <div className="chk_box2">
                                <input type="checkbox" id="chkAll" className="blind"
                                    onChange={(e)=>{allCheckHandler(e.currentTarget.checked)}} 
                                    checked={checkList.length > 0 && checkList.length === etc.checkedList.length && checkList.every(item => etc.checkedList.includes(item))}
                                />
                                <label htmlFor="chkAll">전체선택</label>
                            </div>
                        </div>
                        <div className="util_wrap">
                            <span>선택한 팝업</span>
                            <span>총 <b>{CF.MakeIntComma(checkedNum)}</b>개</span>
                            <div className="btn_box">
                                <button type="button" disabled={showBtn ? false : true} className={`btn_type18${showBtn ? " on" : ""}`} 
                                    onClick={()=>{
                                        btnClickHandler(true);
                                    }}
                                >노출</button>
                                <button type="button" disabled={hideBtn ? false : true} className={`btn_type19${hideBtn ? " on" : ""}`} 
                                    onClick={()=>{
                                        btnClickHandler(false);
                                    }}
                                >중단</button>
                            </div>
                        </div>
                        <div className="util_right">
                            <button type="button" className="btn_type9">삭제</button>
                        </div>
                    </div>
                    <TableWrap 
                        class="tbl_wrap1 tbl_wrap1_1"
                        colgroup={["80px","10%","auto","auto","15%","12%","9%","9%"]}
                        thList={["","번호","제목","기간","팝업창전체크기/1일여부","팝업창위치","사용여부","팝업/레이어"]}
                        tdList={list}
                        type={"popup"}
                        popType={tab}
                    />
                    {list.length > 0 &&
                        <Pagination 
                            currentPage={boardData.current_page} //현재페이지 번호
                            startPage={boardData.start_page} //시작페이지 번호 
                            endPage={boardData.end_page} //보이는 끝페이지 번호 
                            lastPage={boardData.last_page} //총페이지 끝
                        />
                    }
                    <div className="board_btn_wrap">
                        <button type="button" className="btn_type20" onClick={writeBtnClickHandler}>팝업 등록</button>                                        
                    </div>
                </div>
            </div>
        </div>

        {/* 노출,중단하기 confirm팝업 */}
        {useConfirm && <ConfirmPop onClickHandler={useHandler} />}

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default DesignPopup;