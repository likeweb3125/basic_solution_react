import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import { pageNoChange, checkedList } from "../../store/etcSlice";
import SelectBox from "../../components/component/admin/SelectBox";
import TxtSelectBox from "../../components/component/admin/TxtSelectBox";
import InputDatepicker from "../../components/component/admin/InputDatepicker";
import SearchInput from "../../components/component/admin/SearchInput";
import TableWrap from "../../components/component/admin/TableWrap";
import ConfirmPop from "../../components/popup/ConfirmPop";
import Pagination from "../../components/component/admin/Pagination";


const MemberUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const etc = useSelector((state)=>state.etc);
    const member_list = enum_api_uri.member_list;
    const level_list = enum_api_uri.level_list;
    const [confirm, setConfirm] = useState(false);
    const [deltConfirm, setDeltConfirm] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const [boardData, setBoardData] = useState({});
    const [limit, setLimit] = useState(10);
    const [searchType, setSearchType] = useState("이메일");
    const [checkList, setCheckList] = useState([]);
    const [checkedNum, setCheckedNum] = useState(0);
    const [levelList, setLevelList] = useState([]);
    const [mailCheck, setMailCheck] = useState(false);
    const [smsCheck, setSmsCheck] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [memberSelect, setMemberSelect] = useState('');
    const [memberLevel, setMemberLevel] = useState(null);



    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
            setDeltConfirm(false);
        }
    },[popup.confirmPop]);


    //회원등급리스트 가져오기
    const getLevelList = () => {
        axios.get(level_list,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                const list = data.filter((item)=>item.l_name !== null);
                setLevelList(list);
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


    //맨처음 회원등급리스트 가져오기
    useEffect(()=>{
        getLevelList();
    },[]);


    //게시판정보 가져오기
    const getBoardData = (page) => {
        let search;
        if(searchType == "이메일"){
            // search = "title";
        }else if(searchType == "회원명"){
            // search = "title";
        }else if(searchType == "휴대폰"){
            // search = "titlecontents";
        }

        axios.get(`${member_list.replace(":m_level", 1)}?page=${page ? page : 1}${searchTxt.length > 0 ? "&search="+search+"&searchtxt="+searchTxt : ""}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setBoardData(data);
                console.log(data)
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
        if(boardData.hasOwnProperty("member_list")){
            const list = boardData.member_list.map((item) => item.idx).filter(Boolean);
            setCheckList([...list]);
        }
    },[boardData]);


    //전체선택 체크박스 체크시
    const allCheckHandler = (checked) => {
        if(checked){
            dispatch(checkedList([...checkList]));
        }else{
            dispatch(checkedList([]));
        }
    };


    //체크박스 변경시 체크된 수 변경
    useEffect(()=>{
        const num = etc.checkedList.length;
        setCheckedNum(num);
    },[etc.checkedList]);


   


    return(<>
        <div className="page_admin_setting">
            <div className="content_box">
                <div class="search_detail_wrap search_detail_wrap2">
                    <div class="search_detail_box">
                        <div class="search_wrap">
                            <TxtSelectBox 
                                class="select_type2"
                                list={levelList}
                                selected={memberSelect || ""}
                                selectedLevel={memberLevel}
                                onChangeHandler={(e)=>{
                                    const val = e.currentTarget.value;
                                    const level = e.target.options[e.target.selectedIndex].getAttribute("data-level");
                                    setMemberSelect(val);
                                    setMemberLevel(level);
                                    console.log(val);
                                }}
                                objectSel={`level_list`}
                                hiddenTxt={`회원 등급별 보기`}
                            />
                            <div className="search_box">
                                <SelectBox 
                                    class="select_type3"
                                    list={["이메일","회원명","휴대폰번호"]}
                                    selected={searchType}
                                    onChangeHandler={(e)=>{
                                        const val = e.currentTarget.value;
                                        setSearchType(val);
                                    }}
                                    selHidden={true}
                                />
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
                        <div class="search_chk">
                            <div className="chk_box1">
                                <input type="checkbox" id="chkMail" className="blind" 
                                    onChange={(e)=>{
                                        const checked = e.currentTarget.checked;
                                        if(checked){
                                            setMailCheck(true);
                                        }else{
                                            setMailCheck(false);
                                        }
                                    }}
                                    checked={mailCheck ? true : false}
                                />
                                <label htmlFor="chkMail">메일 수신</label>
                            </div>
                            <div className="chk_box1">
                                <input type="checkbox" id="chkSms" className="blind" 
                                    onChange={(e)=>{
                                        const checked = e.currentTarget.checked;
                                        if(checked){
                                            setSmsCheck(true);
                                        }else{
                                            setSmsCheck(false);
                                        }
                                    }}
                                    checked={smsCheck ? true : false}
                                />
                                <label htmlFor="chkSms">문자수신</label>
                            </div>
                        </div>
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
                    <div class="btn_wrap">
                        <button type="button" class="btn_type15">검색</button>
                    </div>
                </div>
                <div className="tit tit2">
                    <h3>
                        <b>전체 회원</b>
                    </h3>
                    <strong>총 {CF.MakeIntComma(boardData.total_count)}명</strong>
                </div>
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
                                limitSel={`명씩`}
                            />
                        </div>
                    </div>
                    <div className="board_table_util flex_wrap">
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
                            <span>선택한 회원</span>
                            <span>총 <b>{CF.MakeIntComma(checkedNum)}</b>명</span>
                            <div class="select_type3">
                                <select name="" id="" title="회원등급 선택">
                                    <option value="">준회원</option>
                                </select>
                            </div>
                            <span>(으)로</span>
                            <button type="button" class="btn_type8">변경</button>
                            <button type="button" class="btn_type9">회원 탈퇴</button>
                        </div>
                        <div className="util_right">
                            <div class="send_msg_wrap">
                                <div class="txt">
                                    <strong>단체문자</strong>
                                    <span>해당 회원 총 <b>30,235</b>명</span>
                                </div>
                                <button type="button" class="btn_type8">전송</button>
                            </div>
                        </div>
                    </div>
                    <TableWrap 
                        class="tbl_wrap1"
                        colgroup={["80px","auto","9%","12%","9%","15%","9%","9%","9%"]}
                        thList={["","이메일","회원명","회원등급","가입일자","휴대폰번호","로그인수","게시글","댓글"]}
                        tdList={boardData.member_list}
                        type={"member"}
                    />
                    {boardData.member_list && boardData.member_list.length > 0 &&
                        <Pagination 
                            currentPage={boardData.current_page} //현재페이지 번호
                            startPage={boardData.start_page} //시작페이지 번호 
                            endPage={boardData.end_page} //보이는 끝페이지 번호 
                            lastPage={boardData.last_page} //총페이지 끝
                        />
                    }
                    <Link to="/console/member/cancel" class="btn_type17">탈퇴 회원 목록</Link>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default MemberUser;