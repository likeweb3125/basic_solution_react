import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import CommentWrap from "../../components/component/admin/CommentWrap";
import ConfirmPop from "../../components/popup/ConfirmPop";
import InputBox from "../../components/component/admin/InputBox";


const MaintDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list_no } = useParams();
    const maint_detail = enum_api_uri.maint_detail;
    const maint_comment_list = enum_api_uri.maint_comment_list;
    const user = useSelector((state)=>state.user);
    const popup = useSelector((state)=>state.popup);
    const common = useSelector((state)=>state.common);
    const [confirm, setConfirm] = useState(false);
    const [boardData, setBoardData] = useState({});
    const [commentList, setCommentList] = useState([]);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //게시글정보 가져오기
    const getBoardData = () => {
        axios.get(`${maint_detail.replace(":category",user.maintName).replace(":list_no",list_no)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
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


    //게시글댓글리스트 가져오기
    const getCommentList = () => {
        axios.get(`${maint_comment_list.replace(":list_no",list_no)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setCommentList(data);
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
        getCommentList();
    },[list_no]);



    //첨부파일 다운로드
    // const fileDownHandler = (idx, name) => {
    //     axios.get(`${board_file_down.replace(":category",board_category).replace(":parent_idx",board_idx).replace(":idx",idx)}`,
    //         {
    //             headers:{Authorization: `Bearer ${user.loginUser.accessToken}`},
    //             responseType: 'blob' // 요청 데이터 형식을 blob으로 설정
    //         }
    //     )
    //     .then((res)=>{
    //         if(res.status === 200){
    //             const blob = new Blob([res.data], { type: 'application/octet-stream' });
    //             const url = window.URL.createObjectURL(blob);
    //             const a = document.createElement('a');
    //             a.href = url;
    //             a.download = name; // 파일명 설정
    //             document.body.appendChild(a);
    //             a.click();
    //             window.URL.revokeObjectURL(url);
    //         }
    //     })
    //     .catch((error) => {
    //         const err_msg = CF.errorMsgHandler(error);
    //         dispatch(confirmPop({
    //             confirmPop:true,
    //             confirmPopTit:'알림',
    //             confirmPopTxt: err_msg,
    //             confirmPopBtn:1,
    //         }));
    //         setConfirm(true);
    //     });
    // };




    return(<>
        <div className="page_admin_board">
            <div className="content_box">
                <div className="tit">
                    <h3>
                        <b>서비스 관리 및 유지보수 시스템</b>
                    </h3>
                </div>
                <div className="board_section">
                    <div className="board_view">
                        <div className="board_tit_box">
                            <div className="board_tit">
                                <h5>{boardData.subject}</h5>
                                <ul className="board_info">
                                    <li>
                                        <strong>{boardData.name}</strong>
                                    </li>
                                    <li>
                                        <em>{boardData.w_date}</em>
                                    </li>
                                    <li>
                                        <span className="view_cnt">{CF.MakeIntComma(boardData.counter)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="board_con">
                            <div className="con" dangerouslySetInnerHTML={{ __html: boardData.contents }}></div>
                            {/* {boardData.b_file && boardData.b_file.length > 0 &&
                                <div className="file_section">
                                    <span>첨부파일</span>
                                    <div>
                                        {boardData.b_file.map((cont,i)=>{
                                            return(
                                                <button type="button" key={i}
                                                    onClick={()=>{
                                                        const name = cont.original_name.replace("upload/board/","");
                                                        fileDownHandler(cont.idx, name);
                                                    }}
                                                >{cont.original_name.replace("upload/board/","")}</button>
                                            );
                                        })}
                                    </div>
                                </div>
                            } */}
                            <CommentWrap 
                                list={commentList}
                                name={user.maintName}
                                list_no={list_no}
                            />
                        </div> 
                    </div>
                    <div className="btn_list_wrap tm30">
                        <button type="button" className="btn_type3" onClick={()=>{navigate(-1)}}>목록</button>
                    </div>
                </div>
            </div>
        </div>


        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default MaintDetail;