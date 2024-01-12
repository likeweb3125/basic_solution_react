import TextareaBox from "./TextareaBox";

const WriteReplyWrap = (
    {
        name,
        depth,
        idx,
        replyComment,
        onReplyTextChangeHandler,
        onEnterHandler,
        onWriteReplyCancelHandler
    }) => {

    return(<>
        <div className="write_reply_wrap">
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
                    count={replyComment.length}
                    value={replyComment}
                    onChangeHandler={onReplyTextChangeHandler}
                />
                <button type="button" className="btn_type14"  onClick={()=>onEnterHandler(depth, replyComment, idx)}>등록</button>
                <button type="button" className="btn_cancel" onClick={onWriteReplyCancelHandler}>답글 취소</button>
            </div>
        </div>
    </>);
};

export default WriteReplyWrap;