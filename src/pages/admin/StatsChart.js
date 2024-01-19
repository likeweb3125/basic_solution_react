import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop, adminMemberInfoPopModify, adminMsgPop } from "../../store/popupSlice";
import { pageNoChange, checkedList } from "../../store/etcSlice";
import SelectBox from "../../components/component/admin/SelectBox";
import TxtSelectBox from "../../components/component/admin/TxtSelectBox";
import InputDatepicker from "../../components/component/admin/InputDatepicker";
import SearchInput from "../../components/component/admin/SearchInput";
import TableWrap from "../../components/component/admin/TableWrap";
import ConfirmPop from "../../components/popup/ConfirmPop";
import Pagination from "../../components/component/admin/Pagination";


const StatsChart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const all_stats_data = enum_api_uri.all_stats_data;
    const stat_data = enum_api_uri.stat_data;

    const [confirm, setConfirm] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const [boardData, setBoardData] = useState({});
    const [searchType, setSearchType] = useState("이메일");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [allStatsData, setAllStatsData] = useState({});
    const [statsData, setStatsData] = useState({});
    const [currentTime, setCurrentTime] = useState('');
    const [dateType, setDateType] = useState('최근 1주');


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //전체통계 가져오기
    const getAllStatsData = () => {
        axios.get(all_stats_data,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                const data = res.data.data;
                setAllStatsData({...data});
                
                let time = new Date();
                    time = moment(time).format('YYYY.MM.DD HH:mm');
                setCurrentTime(time);
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


    //기간별현황 통계 가져오기
    const getStatsData = () => {
        let sdate;
        if(startDate){
            sdate = moment(startDate).format('YYYY.MM.DD');
        }
        let edate;
        if(endDate){
            edate = moment(endDate).format('YYYY.MM.DD');
        }

        axios.get(`${stat_data}${startDate ? "?start="+sdate : ""}${endDate ? "&end="+edate : ""}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                const data = res.data.data;
                setStatsData({...data});
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


    //맨처음 전체통계, 기간별현황 통계 가져오기
    useEffect(()=>{
        getAllStatsData();
        getStatsData();
    },[]);


    //기간별현황통계 날짜 셀렉트박스 값 변경시
    useEffect(()=>{
        if(dateType == '최근 1주'){

        }
    },[dateType]);



   


    return(<>
        <div className="page_admin_charts">
            <div className="content_box">
                <div className="tit">
                    <h3>
                        <b>전체 통계</b>
                    </h3>
                    <p>
                        사이트 개설 이후 <b>{currentTime}</b>까지의 기준 누적 수치입니다.
                        <button type="button" className="btn_sync" onClick={getAllStatsData}>동기화하기</button>
                    </p>
                </div>
                <div className="most_box">
                    <div className="most_item">
                        <span>최다 접속 경로</span>
                        {allStatsData.logsTopUrl && <>
                            <strong>{allStatsData.logsTopUrl.previousUrl}</strong>
                            <button type="button" className="btn_type12">상세보기</button>
                        </>}
                    </div>
                    <div className="most_item">
                        <span>최다 브라우저</span>
                        {allStatsData.logsTopAgent && <>
                            <strong>{allStatsData.logsTopAgent.userAgent}</strong>
                            <button type="button" className="btn_type12">상세보기</button>
                        </>}
                    </div>
                </div>
                <div className="total_num_box">
                    <ul>
                        <li>
                            <span>총 방문</span>
                            <strong><b>{allStatsData.logsTotalCnt ? CF.MakeIntComma(allStatsData.logsTotalCnt) : 0}</b> 명</strong>
                        </li>
                        <li>
                            <span>총 가입회원</span>
                            <strong><b>{allStatsData.userTotalCnt ? CF.MakeIntComma(allStatsData.userTotalCnt) : 0}</b> 명</strong>
                        </li>
                        <li>
                            <span>총 게시글</span>
                            <strong><b>{allStatsData.boardTotalCnt ? CF.MakeIntComma(allStatsData.boardTotalCnt) : 0}</b> 개</strong>
                        </li>
                        <li>
                            <span>총 댓글</span>
                            <strong><b>{allStatsData.commentTotalCnt ? CF.MakeIntComma(allStatsData.commentTotalCnt) : 0}</b> 개</strong>
                        </li>
                    </ul>
                </div>
                <div className="charts_section">
                    <div className="tit">
                        <h3>
                            <b>기간별 현황 통계</b>
                        </h3>
                    </div>
                    <div className="search_detail_wrap">
                        <div className="search_detail_box">
                            <div className="search_wrap">
                                {/* <!-- 최근 1주 - 일별 -->
                                <!-- 1개월 - 1주씩 -->
                                <!-- 3개월 - 1주씩 -->
                                <!-- 6개월 - 1달씩 --> */}
                                <SelectBox 
                                    class="select_type3"
                                    list={["최근 1주","1개월","3개월","6개월","직접 입력"]}
                                    selected={dateType}
                                    onChangeHandler={(e)=>{
                                        const val = e.currentTarget.value;
                                        setDateType(val);
                                    }}
                                    selHidden={true}
                                />
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
                        <div className="btn_wrap">
                            <button type="button" className="btn_type15">검색</button>
                        </div>
                    </div>

                    <div className="charts_box">
                        <div className="charts_tit">
                            <h4>사이트 현황 통계</h4>
                            <ul className="charts_tab">
                                <li className="on">
                                    <button type="button">방문</button>
                                </li>
                                <li>
                                    <button type="button">가입회원</button>
                                </li>
                                <li>
                                    <button type="button">게시글</button>
                                </li>
                                <li>
                                    <button type="button">댓글</button>
                                </li>
                            </ul>
                        </div>
                        <div className="charts" id="chart"></div>
                    </div>

                </div>
                <div className="total_num_box">
                    <ul>
                        <li>
                            <span>최근 1주 누적 방문</span>
                            <strong><b>{statsData.totalLogCnt ? CF.MakeIntComma(statsData.totalLogCnt) : 0}</b> 명</strong>
                        </li>
                        <li>
                            <span>최근 1주 누적 가입회원</span>
                            <strong><b>{statsData.totalUserCnt ? CF.MakeIntComma(statsData.totalUserCnt) : 0}</b> 명</strong>
                        </li>
                        <li>
                            <span>최근 1주 누적 게시글</span>
                            <strong><b>{statsData.totalBoardCnt ? CF.MakeIntComma(statsData.totalBoardCnt) : 0}</b> 개</strong>
                        </li>
                        <li>
                            <span>최근 1주 누적 댓글</span>
                            <strong><b>{statsData.totalCommentCnt ? CF.MakeIntComma(statsData.totalCommentCnt) : 0}</b> 개</strong>
                        </li>
                    </ul>
                </div>
                <TableWrap 
                    class="tbl_wrap1"
                    colgroup={[]}
                    thList={["일자","방문수","가입회원","새 게시글","새 댓글"]}
                    tdList={statsData.list}
                    type={"stats"}
                />
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default StatsChart;