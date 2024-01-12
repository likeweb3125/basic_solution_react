import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/ko';
import * as CF from "../../../config/function";
import TextareaBox from "./TextareaBox";
import ReplyWrap from "./ReplyWrap";
import ConfirmPop from "../../popup/ConfirmPop";


const CommentWrap2 = (
    {
        commentList,
        name,
        comment,
        onTextChangeHandler,
        onEnterHandler,
        replyComment,
        onReplyTextChangeHandler,
        replyEnterOk,
        editComment,
        onEditTextChangeHandler,
        onEditEnterHandler,
        onEditBtnClickHandler,
        editShow,
        onDeltHandler
    }) => {
    const popup = useSelector((state)=>state.popup);
    const [confirm, setConfirm] = useState(false);
    const [list, setList] = useState([]);
    const [listCount, setListCount] = useState(0);
    const [replyShow, setReplyShow] = useState({});
    const [writeReply, setWriteReply] = useState(null);
    


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    useEffect(()=>{
        setList(commentList);
    },[commentList]);


    //대댓글보이기 토글
    const onReplyToggleHandler = (idx, val) => {
        let newReplyShow = {...replyShow};
        newReplyShow[idx] = val;
        setReplyShow(newReplyShow);
    };

    //답글달기
    const onWriteReplyHandler = (idx) => {
        setWriteReply(idx);

        let newReplyShow = {...replyShow};
        newReplyShow[idx] = true;
        setReplyShow(newReplyShow);
    };

    //답글달기 완료시 답글달기 영역 미노출
    useEffect(()=>{
        if(replyEnterOk){
            setWriteReply(null);
        }
    },[replyEnterOk]);


    //댓글개수 구하기
    useEffect(()=>{
        function countList(tree) {
            let count = 0;
          
            function dfs(node) {
              count++; // 각 노드 방문 시 개수 증가
          
              if (node.children && node.children.length > 0) {
                for (let childNode of node.children) {
                  dfs(childNode); // 자식 노드에 대해 재귀 호출
                }
              }
            }
          
            for (let rootNode of tree) {
              dfs(rootNode); // 각 루트 노드에 대해 DFS 시작
            }
          
            return count;
        }
          
        const total = countList(list);
        setListCount(total);
    },[list]);


    return(<>
        <div className="comment_section">
            <div className="txt">
                <span>댓글</span>
                <span className="cnt">{CF.MakeIntComma(listCount)}</span>
            </div>
            <div className="comment_wrap">
                <div className="comment_box">
                    {list.map((cont,i)=>{
                        
                        const time = moment(cont.c_reg_date).format('YYYY-MM-DD A hh:mm:ss');

                        return(
                            <div className="comment" key={i}>
                                <div className="comment_item">
                                    <div className="profile">
                                        <ul className="comment_info">
                                            <li>
                                                <strong>{cont.m_name}</strong>
                                            </li>
                                            <li>
                                                <em>{time}</em>
                                            </li>
                                            {writeReply != cont.idx && //답글작성시 버튼 미노출
                                                <li>
                                                    <button type="button" className="btn_write_comment" onClick={()=>onWriteReplyHandler(cont.idx)}>답글쓰기</button>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                    <div className="con_comment">
                                        {editShow == cont.idx ?
                                            <div className="write_comment">
                                                <TextareaBox 
                                                    cols={30}
                                                    rows={4}
                                                    placeholder="댓글을 입력해주세요."
                                                    countShow={true}
                                                    countMax={300}
                                                    count={editComment.length}
                                                    value={editComment}
                                                    onChangeHandler={onEditTextChangeHandler}
                                                />
                                                <button type="button" className="btn_type14" onClick={()=>onEditEnterHandler(cont.idx)}>등록</button>
                                            </div>
                                            :<p>{cont.c_contents}</p>
                                        }
                                    </div>
                                    <div className="comment_util">
                                        {editShow == cont.idx ? <button type="button" className="btn_type11" onClick={()=>onEditBtnClickHandler(null)}>취소</button>
                                            :<button type="button" className="btn_type11" onClick={()=>onEditBtnClickHandler(cont.idx, cont.c_contents)}>수정</button>
                                        }
                                        <button type="button" className="btn_type12" onClick={()=>onDeltHandler(cont.idx)}>삭제</button>
                                    </div>
                                </div>
                                {/* 대댓글 */}
                                <ReplyWrap 
                                    name={name}
                                    data={cont} 
                                    onEnterHandler={onEnterHandler}
                                    onReplyToggleHandler={onReplyToggleHandler} 
                                    replyShow={replyShow} 
                                    replyComment={replyComment}
                                    onReplyTextChangeHandler={onReplyTextChangeHandler}
                                    writeReply={writeReply}
                                    onWriteReplyHandler={onWriteReplyHandler}
                                    onWriteReplyCancelHandler={()=>setWriteReply(null)}
                                    //댓글수정
                                    editComment={editComment}
                                    onEditTextChangeHandler={onEditTextChangeHandler}
                                    onEditEnterHandler={onEditEnterHandler}
                                    onEditBtnClickHandler={onEditBtnClickHandler}
                                    editShow={editShow}
                                    //댓글삭제
                                    onDeltHandler={onDeltHandler}
                                />
                                {/* //대댓글 */}
                            </div>  
                        );
                    })}
                </div>
                <div className="write_comment_wrap">
                    <div className="writer_wrap">
                        <div className="writer_info">
                            <strong className="user_name">{name}</strong>
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
                        <button type="button" className="btn_type14" onClick={()=>onEnterHandler(0,comment)}>등록</button>
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default CommentWrap2;