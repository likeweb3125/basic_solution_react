import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import history from "../../config/history";
import { confirmPop } from "../../store/popupSlice";
import { detailPageBack } from "../../store/etcSlice";
import ConfirmPop from "../../components/popup/ConfirmPop";


const BoardDetail = () => {
    const dispatch = useDispatch();
    const { board_category, board_idx } = useParams();
    const api_uri = enum_api_uri.api_uri;
    const board_detail = enum_api_uri.board_detail;
    const board_file_down = enum_api_uri.board_file_down;
    const user = useSelector((state)=>state.user);
    const popup = useSelector((state)=>state.popup);
    const common = useSelector((state)=>state.common);
    const [confirm, setConfirm] = useState(false);
    const [boardData, setBoardData] = useState({});
    const [boardSettingData, setBoardSettingData] = useState({});


    //상세페이지 뒤로가기
    useEffect(() => {
        const listenBackEvent = () => {
            dispatch(detailPageBack(true));
        };
    
        const unlistenHistoryEvent = history.listen(({ action }) => {
            if (action === "POP") {
                listenBackEvent();
            }
        });

        return unlistenHistoryEvent;
    },[]);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //게시글정보 가져오기
    const getBoardData = () => {
        axios.get(`${board_detail.replace(":category",board_category).replace(":idx",board_idx)}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setBoardData(data);
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
        getBoardData();

        //게시판설정정보 가져오기
        setBoardSettingData(common.boardSettingData);
    },[board_category,board_idx]);


    //첨부파일 다운로드
    const fileDownHandler = (idx, name) => {
        axios.get(`${board_file_down.replace(":category",board_category).replace(":parent_idx",board_idx).replace(":idx",idx)}`,
            {
                responseType: 'blob' // 요청 데이터 형식을 blob으로 설정
            }
        )
        .then((res)=>{
            if(res.status === 200){
                const blob = new Blob([res.data], { type: 'application/octet-stream' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = name; // 파일명 설정
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
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
        <div className="page_user_magazine_view page_user_board">
            <div className="section_wrap">
                <div className="section_inner">
                    <div className="board_section">
                        <div className="board_view">
                            <div className="board_tit_box">
                                <div className="board_tit">
                                    <h5>{boardData.b_title}</h5>
                                    <ul className="board_info">
                                        <li>
                                            <em>{boardData.b_reg_date}</em>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="board_con">
                                {/* 갤러리게시판일때만 썸네일이미지 보이기 */}
                                {/* {boardSettingData.c_content_type == 5 &&
                                    <div className="img_box"><img src={api_uri+boardData.b_img} alt="썸네일이미지"/></div>
                                } */}
                                <div className="con" dangerouslySetInnerHTML={{ __html: boardData.b_contents }}></div>
                                {boardData.b_file && boardData.b_file.length > 0 &&
                                <div className="file_section">
                                    <span>첨부파일</span>
                                    <div>
                                        {boardData.b_file.map((cont,i)=>{
                                            return(
                                                <button type="button" key={i}
                                                    onClick={()=>{
                                                        const name = cont.original_name;
                                                        fileDownHandler(cont.idx, name);
                                                    }}
                                                >{cont.original_name}</button>
                                            );
                                        })}
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                        <div className="board_pagination">
                            <div className="pagination_box board_prev">
                                <b>이전글</b>
                                <span>
                                    {boardData.prev_board ? <Link to={`/news/${board_category}/${boardData.prev_board.idx}`}>{boardData.prev_board.b_title}</Link>
                                        :"이전글이 없습니다."
                                    }
                                </span>
                            </div>
                            <div className="pagination_box board_next">
                                <b>다음글</b>
                                <span>
                                    {boardData.next_board ? <Link to={`/news/${board_category}/${boardData.next_board.idx}`}>{boardData.next_board.b_title}</Link>
                                        :"다음글이 없습니다."
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="btn_list_wrap">
                            <Link to="/news" className="btn_style3">
                                <span>목록 보기</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default BoardDetail;