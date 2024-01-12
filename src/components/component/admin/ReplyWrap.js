import moment from "moment";
import 'moment/locale/ko';
import WriteReplyWrap from "./WriteReplyWrap";
import TextareaBox from "./TextareaBox";

const ReplyWrap = (
    {   
        name,
        data, 
        onReplyToggleHandler,
        replyShow,
        replyComment,
        onReplyTextChangeHandler,
        writeReply,
        onWriteReplyHandler,
        onWriteReplyCancelHandler,
        editComment, 
        onEditTextChangeHandler,
        onEditEnterHandler,
        onEditBtnClickHandler,
        editShow,
        onEnterHandler,
        onDeltHandler
    }
    ) => {

    return (
        <div className={`reply_wrap${(data.children.length > 0 || data.idx == writeReply) ? ' on' : ''}`}>
            {data.children.length > 0 && !replyShow[data.idx] ?
                <div className="btn_reply_more_wrap">
                    <button type="button" className="btn_reply_more" onClick={() => onReplyToggleHandler(data.idx, true)}>
                        댓글 더보기
                    </button>
                    <button type="button" className="btn_reply_more_txt" onClick={() => onReplyToggleHandler(data.idx, true)}>
                        댓글 더보기
                    </button>
                </div>
            :   (replyShow[data.idx] || data.idx == writeReply) &&
                <div className="reply_comment">
                    {data.children.length > 0 && <>
                        <button type="button" className="btn_reply_toggle on" onClick={() => onReplyToggleHandler(data.idx, false)}>
                            댓글 토글
                        </button>
                        {data.children.map((reply, i) => {
                            const time = moment(reply.c_reg_date).format('YYYY-MM-DD A hh:mm:ss');

                            return(
                                <div className="comment" key={i}>
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>{reply.m_name}</strong>
                                                </li>
                                                <li>
                                                    <em>{time}</em>
                                                </li>
                                                {reply.depth < 5 && //depth4 까지만 대댓글작성가능
                                                    writeReply != reply.idx && //답글작성시 버튼 미노출
                                                    <li>
                                                        <button type="button" className="btn_write_comment" onClick={()=>onWriteReplyHandler(reply.idx)} >답글쓰기</button>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            {editShow == reply.idx ?
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
                                                    <button type="button" className="btn_type14" onClick={()=>onEditEnterHandler(reply.idx)}>등록</button>
                                                </div>
                                                :<p>{reply.c_contents}</p>
                                            }
                                        </div>
                                        <div className="comment_util">
                                            {editShow == reply.idx ? <button type="button" className="btn_type11" onClick={()=>onEditBtnClickHandler(null)}>취소</button>
                                                :<button type="button" className="btn_type11" onClick={()=>onEditBtnClickHandler(reply.idx, reply.c_contents)}>수정</button>
                                            }
                                            <button type="button" className="btn_type12" onClick={()=>onDeltHandler(reply.idx)}>삭제</button>
                                        </div>
                                    </div>
                                    {/* 대댓글 */}
                                    <ReplyWrap 
                                        name={name}
                                        data={reply} 
                                        onEnterHandler={onEnterHandler}
                                        onReplyToggleHandler={onReplyToggleHandler} 
                                        replyShow={replyShow} 
                                        replyComment={replyComment}
                                        onReplyTextChangeHandler={onReplyTextChangeHandler}
                                        writeReply={writeReply}
                                        onWriteReplyHandler={onWriteReplyHandler}
                                        onWriteReplyCancelHandler={onWriteReplyCancelHandler}
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
                    </>}
                    {data.idx == writeReply &&
                        <WriteReplyWrap 
                            replyComment={replyComment}
                            onReplyTextChangeHandler={onReplyTextChangeHandler}
                            onEnterHandler={onEnterHandler}
                            onWriteReplyCancelHandler={onWriteReplyCancelHandler}
                            depth={data.depth + 1}
                            idx={data.idx}
                            name={name}
                        />
                    }
                </div>
            }
        </div>
    );
};
  
  export default ReplyWrap;