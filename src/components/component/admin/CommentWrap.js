import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enum_api_uri } from "../../../config/enum";
import * as CF from "../../../config/function";
import { confirmPop } from "../../../store/popupSlice";
import TextareaBox from "./TextareaBox";
import ConfirmPop from "../../popup/ConfirmPop";


const CommentWrap = (props) => {
    const maint_comment = enum_api_uri.maint_comment;
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const [confirm, setConfirm] = useState(false);
    const [list, setList] = useState([]);
    const [comment, setComment] = useState("");


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    useEffect(()=>{
        setList(props.list);
    },[props.list]);


    //댓글 textarea 값 변경시
    const onTextChangeHandler = (e) => {
        const val = e.currentTarget.value;
        setComment(val);
    };


    //댓글등록버튼 클릭시
    const enterBtnClickHandler = () => {
        if(comment.length == 0){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'댓글을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else{
            enterHandler();
        }
    };


    //댓글등록하기
    const enterHandler = () => {
        const body = {
            list_no: props.list_no,
            c_name: user.maintName,
            c_content: comment,
            m_id: "",
            c_password: "",
            c_table: "admin",
        };
        axios.post(`${maint_comment}`, body, 
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt:'댓글이 등록되었습니다.',
                    confirmPopBtn:1,
                }));
                setConfirm(true);
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
        <div className="comment_section">
            <div className="txt">
                <span>댓글</span>
                <span className="cnt">{CF.MakeIntComma(list.length)}</span>
            </div>
            <div className="comment_wrap">
                <div className="comment_box">
                    {list.map((cont,i)=>{
                        return(
                            <div key={i} className="comment">
                                <div className="comment_item">
                                    <div className="profile">
                                        <ul className="comment_info">
                                            <li>
                                                <strong>{cont.c_name}</strong>
                                            </li>
                                            <li>
                                                <em>{cont.c_wdate}</em>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="con_comment">
                                        <p>{cont.c_content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="write_comment_wrap">
                    <div className="writer_wrap">
                        <div className="writer_info">
                            <strong className="user_name">{props.name}</strong>
                        </div>
                    </div>
                    <div className="write_comment">
                        <TextareaBox 
                            cols={30}
                            rows={4}
                            placeholder="댓글을 입력해주세요."
                            countShow={true}
                            countMax={300}
                            count={comment.length}
                            value={comment}
                            onChangeHandler={onTextChangeHandler}
                        />
                        <button type="button" className="btn_type14" onClick={enterBtnClickHandler}>등록</button>
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default CommentWrap;