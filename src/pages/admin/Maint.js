import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import { pageNoChange, listPageData, detailPageBack } from "../../store/etcSlice";
import SelectBox from "../../components/component/admin/SelectBox";
import SearchInput from "../../components/component/admin/SearchInput";
import TableWrap from "../../components/component/admin/TableWrap";
import ConfirmPop from "../../components/popup/ConfirmPop";
import Pagination from "../../components/component/admin/Pagination";
import bank_maint from "../../images/bank_maint.png";


const Maint = () => {
    const dispatch = useDispatch();
    const maint_list = enum_api_uri.maint_list;
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const etc = useSelector((state)=>state.etc);
    const [confirm, setConfirm] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const [boardData, setBoardData] = useState({});
    const [limit, setLimit] = useState(10);
    const [searchType, setSearchType] = useState("제목만");
    const [process, setProcess] = useState("");
    const [processList, setProcessList] = useState(["접수완료","협의중","검토중","작업중","처리완료","무상처리","재요청","입금대기중"]);
    const [scrollMove, setScrollMove] = useState(false);


    //상세->목록으로 뒤로가기시 저장되었던 스크롤위치로 이동
    useEffect(()=>{
        if(scrollMove){
            const y = etc.scrollY;
            window.scrollTo(0,y); 
        }
    },[scrollMove]);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //게시판정보 가져오기
    const getBoardData = (page) => {
        let search;
        if(searchType == "제목만"){
            search = "title";
        }else if(searchType == "제목+내용"){
            search = "titlecontents";
        }else if(searchType == "작성자"){
            search = "name";
        } 

        axios.get(`${maint_list.replace(":category",user.maintName)}?page=${page ? page : 1}&getLimit=${limit}${searchTxt.length > 0 ? "&search="+search+"&searchtxt="+searchTxt : ""}${process.length > 0 ? "&process="+process : ""}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setBoardData(data);

                //리스트페이지 조회 데이터저장
                let pageData = {
                    limit: limit,
                    page: page,
                    search: search,
                    searchTxt: searchTxt
                };
                dispatch(listPageData(pageData));
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



    return(<>
        <div className="page_admin_maint">
            <div className="content_box">
                <div className="maint_notice">
                    <div className="maint_box">
                        <h2>유지보수 서비스 이용</h2>
                        <p>
                            귀사(하)의 무궁한 발전을 기원합니다. 
                            <br/>
                            유지보수 게시판은 라이크웹과 고객님의 소통공간입니다.
                            <br/>
                            수정사항 및 궁금하신 점은 <b>아래 전화번호</b>로 연락 부탁드립니다.
                        </p>
                        <ul className="list_maint">
                            <li>
                                <span>개발</span>
                                <strong>070-7443-3143</strong>
                            </li>
                            <li>
                                <span>계좌정보</span>
                                <strong>
                                    <div className="bank_box">
                                        <img src={bank_maint} alt="국민은행"/>
                                        <b>국민은행</b>
                                    </div>
                                    387601-04-075401 라이크웹
                                </strong>
                            </li>
                            <li>
                                <span>기술문의</span>
                                <strong>070-7443-3131</strong>
                            </li>
                        </ul>
                        <button type="button" onClick={()=>{window.open("https://www.likeweb.co.kr/")}} className="btn_likeweb"><strong><b>LIKE</b>WEB</strong> 바로가기</button>
                    </div>
                </div>
                <div className="tit tit2">
                    <h3>
                        <b>서비스 관리 및 유지보수 시스템</b>
                    </h3>
                    <strong>총 {CF.MakeIntComma(boardData.total_count)}건</strong>
                </div>
                <div className="board_section">
                    <div className="form_search_wrap">
                        <div className="search_wrap">
                            <SelectBox 
                                class="select_type3 select_status"
                                list={processList}
                                selected={process}
                                onChangeHandler={(e)=>{
                                    const val = e.currentTarget.value;
                                    setProcess(val);
                                }}
                                selHidden={true}
                                required={true}
                                hiddenTxt={`진행상황 선택`}
                            />
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
                                <SelectBox 
                                    class="select_type3"
                                    list={["제목만","제목+내용"]}
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
                    </div>
                    <TableWrap 
                        class="tbl_wrap1"
                        colgroup={["12%","auto","12%","9%","15%"]}
                        thList={["번호","제목","작성자","진행상황","작성일"]}
                        tdList={boardData.board_list}
                        data={boardData}
                        type={"maint"}
                    />
                    {boardData.board_list && boardData.board_list.length > 0 &&
                        <Pagination   
                            currentPage={boardData.current_page} //현재페이지 번호
                            startPage={boardData.start_page} //시작페이지 번호 
                            endPage={boardData.end_page} //보이는 끝페이지 번호 
                            lastPage={boardData.last_page} //총페이지 끝
                        />
                    }
                    <div className={`board_btn_wrap${boardData.board_list && boardData.board_list.length > 0 ? "" : " none_list"}`}>
                        <Link to={`/console/maint/write`} className="btn_type4">작성</Link>                                       
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Maint;