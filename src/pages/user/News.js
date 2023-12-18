import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import { listPageData, detailPageBack } from "../../store/etcSlice";
import { boardSettingData } from "../../store/commonSlice";
import ConfirmPop from "../../components/popup/ConfirmPop";
import SearchSelectBox from "../../components/component/user/SearchSelectBox";
import SearchInput from "../../components/component/user/SearchInput";


const News = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const etc = useSelector((state)=>state.etc);
    const api_uri = enum_api_uri.api_uri;
    const board_list = enum_api_uri.board_list;
    const [confirm, setConfirm] = useState(false);
    const [newsList, setNewsList] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchType, setSearchType] = useState("제목만");
    const [searchTxt, setSearchTxt] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
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


    //뉴스게시판 리스트 가져오기
    const getList = (page) => {
        let pageNum;
        let search;
        let searchText;

        //상세페이지에서 뒤로가기시 저장된 리스트페이지 정보로 조회
        if(etc.detailPageBack){
            pageNum = etc.listPageData.page;
            search = etc.listPageData.search;
            searchText = etc.listPageData.searchTxt;

            let type;
            if(search == "title"){
                type = "제목만";
            }else if(search == "titlecontents"){
                type = "제목+내용";
            }

            setSearchType(type);
            setSearchTxt(searchText);
        }else{
            pageNum = page;

            if(searchType == "제목만"){
                search = "title";
            }else if(searchType == "제목+내용"){
                search = "titlecontents";
            }

            searchText = searchTxt;
        }

        axios.get(`${board_list.replace(":category",49).replace(":limit",8)}?page=${pageNum ? pageNum : 1}${searchText.length > 0 ? "&search="+search+"&searchtxt="+searchText : ""}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setTotal(data.total_count);
                setNewsList(data.board_list);

                //게시판설정정보 store 에 저장
                const newData = {...data};
                delete newData.board_list;
                dispatch(boardSettingData(newData));

                //현재리스트페이지번호 저장
                setCurrentPage(data.current_page); 

                //리스트페이지 조회 데이터저장
                let pageData = {
                    page: page,
                    search: search,
                    searchTxt: searchTxt
                };
                dispatch(listPageData(pageData));

                //상세페이지에서 뒤로가기시
                if(etc.detailPageBack){
                    setScrollMove(true);
                    dispatch(detailPageBack(false));
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
        getList();
    },[]);


    //더보기버튼 클릭시
    const moreHandler = () => {
        const num = currentPage+1;

        axios.get(`${board_list.replace(":category",49).replace(":limit",8)}?page=${num}${searchTxt.length > 0 ? "&search="+searchType+"&searchtxt="+searchTxt : ""}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setNewsList([...newsList,...data.board_list]);

                setCurrentPage(data.current_page); //현재리스트페이지 저장
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
        <div className="search_wrap">
            <div className="search_box_type1">
                <SearchSelectBox 
                    class="select_box"
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
                    onSearchHandler={()=>getList()}
                />
            </div>
        </div>
        <div className="gallery_board">
            <div className="board_util">
                <em className="txt_total">총 소식 <b>{CF.MakeIntComma(total)}개</b></em>
            </div>
            {newsList.length > 0 ?
                <ul className="list_gallery2">
                    {newsList.map((cont,i)=>{
                        const img = api_uri+cont.b_img;

                        let num = cont.num;
                        if(num < 10){
                            num = "0"+num;
                        }

                        return(
                            <li key={i}>
                                <Link to={`/news/${cont.category}/${cont.idx}`}>
                                    <div className="img">
                                        <img src={img} alt="썸네일이미지"/>
                                        <div className="item_date">
                                            <span>{cont.b_reg_date}</span>
                                            <b>{num}</b>
                                        </div>
                                    </div>
                                    <div className="txt">
                                        <strong>{cont.b_title}</strong>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                :<div className="none_data">데이터가 없습니다.</div>
            }
        </div>
        {total > newsList.length &&
            <div className="btn_more_wrap">
                <button type="button" className="btn_style1" onClick={moreHandler}>
                    <span>More View</span>
                </button>
            </div>
        }

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default News;