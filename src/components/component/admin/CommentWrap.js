const CommentWrap = (props) => {
    return(
        <div className="comment_section">
            <div className="txt">
                <span>댓글</span>
                <span className="cnt">37</span>
            </div>
            <div className="comment_wrap">
                <div className="comment_box">
                    <div className="comment">
                        <div className="comment_item">
                            <div className="profile">
                                <ul className="comment_info">
                                    <li>
                                        <strong>관리자</strong>
                                    </li>
                                    <li>
                                        <em>2023.07.23</em>
                                    </li>
                                    <li>
                                        <button type="button" className="btn_write_comment">답글쓰기</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="con_comment">
                                <p>저녁 뭐 먹죠1</p>
                            </div>
                            <div className="comment_util">
                                <button type="button" className="btn_type11">수정</button>
                                <button type="button" className="btn_type12">삭제</button>
                            </div>
                        </div>
                        <div className="reply_wrap">
                            <div className="reply_comment">
                                <button type="button" className="btn_reply_toggle on">댓글 토글</button>
                                <div className="comment">
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>관리자</strong>
                                                </li>
                                                <li>
                                                    <em>2023.07.23</em>
                                                </li>
                                                <li>
                                                    <button type="button" className="btn_write_comment">답글쓰기</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            <p>저녁 뭐 먹죠1-1</p>
                                        </div>
                                        <div className="comment_util">
                                            <button type="button" className="btn_type11">수정</button>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>관리자</strong>
                                                </li>
                                                <li>
                                                    <em>2023.07.23</em>
                                                </li>
                                                <li>
                                                    <button type="button" className="btn_write_comment">답글쓰기</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            <p>저녁 뭐 먹죠1-2</p>
                                        </div>
                                        <div className="comment_util">
                                            <button type="button" className="btn_type11">수정</button>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                    <div className="reply_wrap">
                                        <div className="btn_reply_more_wrap">
                                            <button type="button" className="btn_reply_more">댓글 더보기</button>
                                            <button type="button" className="btn_reply_more_txt">댓글 더보기</button>
                                        </div>
                                        <div className="reply_comment">
                                            {/* <div className="comment">
                                                <div className="comment_item">
                                                    <div className="profile">
                                                        <ul className="comment_info">
                                                            <li>
                                                                <strong>관리자</strong>
                                                            </li>
                                                            <li>
                                                                <em>2023.07.23</em>
                                                            </li>
                                                            <li>
                                                                <button type="button" className="btn_write_comment">답글쓰기</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="con_comment">
                                                        <p>저녁 뭐 먹죠1-2-1</p>
                                                    </div>
                                                    <div className="comment_util">
                                                        <button type="button" className="btn_type11">수정</button>
                                                        <button type="button" className="btn_type12">삭제</button>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>관리자</strong>
                                                </li>
                                                <li>
                                                    <em>2023.07.23</em>
                                                </li>
                                                <li>
                                                    <button type="button" className="btn_write_comment">답글쓰기</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            <p>저녁 뭐 먹죠1-3</p>
                                        </div>
                                        <div className="comment_util">
                                            <button type="button" className="btn_type11">수정</button>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                </div>

                                {/* 답글입력 */}
                                <div className="write_reply_wrap">
                                    <div className="writer_wrap">
                                        <div className="writer_info">
                                            {/* 로그인 했을 경우 strong태그에 user_name추가 */}
                                            <strong className="user_name">관리자</strong>
                                        </div>
                                    </div>
                                    <div className="write_comment">
                                        <div className="textarea_box">
                                            <textarea name="" id="" cols="30" rows="4" placeholder="댓글을 입력해주세요."></textarea>
                                            <span className="char_cnt">0 / 300</span>
                                        </div>
                                        <button type="button" className="btn_type14">등록</button>
                                        <button type="button" className="btn_cancel">답글 취소</button>
                                    </div>
                                </div>
                                {/* //답글입력 */}

                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        <div className="comment_item">
                            <div className="profile">
                                <ul className="comment_info">
                                    <li>
                                        <strong>관리자</strong>
                                    </li>
                                    <li>
                                        <em>2023.07.23</em>
                                    </li>
                                    <li>
                                        <button type="button" className="btn_write_comment">답글쓰기</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="con_comment">
                                <p>저녁 뭐 먹죠1</p>
                            </div>
                            <div className="comment_util">
                                <button type="button" className="btn_type11">수정</button>
                                <button type="button" className="btn_type12">삭제</button>
                            </div>
                        </div>
                        <div className="reply_wrap">
                            <div className="reply_comment">
                                <button type="button" className="btn_reply_toggle on">댓글 토글</button>
                                <div className="comment">
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>관리자</strong>
                                                </li>
                                                <li>
                                                    <em>2023.07.23</em>
                                                </li>
                                                <li>
                                                    <button type="button" className="btn_write_comment">답글쓰기</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            <p>저녁 뭐 먹죠1-1</p>
                                        </div>
                                        <div className="comment_util">
                                            <button type="button" className="btn_type11">수정</button>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>관리자</strong>
                                                </li>
                                                <li>
                                                    <em>2023.07.23</em>
                                                </li>
                                                <li>
                                                    <button type="button" className="btn_write_comment">답글쓰기</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            <p>저녁 뭐 먹죠1-2</p>
                                        </div>
                                        <div className="comment_util">
                                            <button type="button" className="btn_type11">수정</button>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                    <div className="reply_wrap">
                                        {/* <div className="btn_reply_more_wrap">
                                            <button type="button" className="btn_reply_more">댓글 더보기</button>
                                            <button type="button" className="btn_reply_more_txt">댓글 더보기</button>
                                        </div> */}
                                        <div className="reply_comment">
                                            <button type="button" className="btn_reply_toggle on">댓글 토글</button>
                                            <div className="comment">
                                                <div className="comment_item">
                                                    <div className="profile">
                                                        <ul className="comment_info">
                                                            <li>
                                                                <strong>관리자</strong>
                                                            </li>
                                                            <li>
                                                                <em>2023.07.23</em>
                                                            </li>
                                                            <li>
                                                                <button type="button" className="btn_write_comment">답글쓰기</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="con_comment">
                                                        <p>저녁 뭐 먹죠1-2-1</p>
                                                    </div>
                                                    <div className="comment_util">
                                                        <button type="button" className="btn_type11">수정</button>
                                                        <button type="button" className="btn_type12">삭제</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>관리자</strong>
                                                </li>
                                                <li>
                                                    <em>2023.07.23</em>
                                                </li>
                                                <li>
                                                    <button type="button" className="btn_write_comment">답글쓰기</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            <p>저녁 뭐 먹죠1-3</p>
                                        </div>
                                        <div className="comment_util">
                                            <button type="button" className="btn_type11">수정</button>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="comment_item">
                                        <div className="profile">
                                            <ul className="comment_info">
                                                <li>
                                                    <strong>관리자</strong>
                                                </li>
                                                <li>
                                                    <em>2023.07.23</em>
                                                </li>
                                                <li>
                                                    <button type="button" className="btn_write_comment">답글쓰기</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="con_comment">
                                            <p>저녁 뭐 먹죠1-2</p>
                                        </div>
                                        <div className="comment_util">
                                            <button type="button" className="btn_type11">수정</button>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                    <div className="reply_wrap">
                                        {/* <div className="btn_reply_more_wrap">
                                            <button type="button" className="btn_reply_more">댓글 더보기</button>
                                            <button type="button" className="btn_reply_more_txt">댓글 더보기</button>
                                        </div> */}
                                        <div className="reply_comment">
                                            <button type="button" className="btn_reply_toggle on">댓글 토글</button>
                                            <div className="comment">
                                                <div className="comment_item">
                                                    <div className="profile">
                                                        <ul className="comment_info">
                                                            <li>
                                                                <strong>관리자</strong>
                                                            </li>
                                                            <li>
                                                                <em>2023.07.23</em>
                                                            </li>
                                                            <li>
                                                                <button type="button" className="btn_write_comment">답글쓰기</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="con_comment">
                                                        <p>저녁 뭐 먹죠1-2-1</p>
                                                    </div>
                                                    <div className="comment_util">
                                                        <button type="button" className="btn_type11">수정</button>
                                                        <button type="button" className="btn_type12">삭제</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="comment">
                                                <div className="comment_item">
                                                    <div className="profile">
                                                        <ul className="comment_info">
                                                            <li>
                                                                <strong>관리자</strong>
                                                            </li>
                                                            <li>
                                                                <em>2023.07.23</em>
                                                            </li>
                                                            <li>
                                                                <button type="button" className="btn_write_comment">답글쓰기</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="con_comment">
                                                        <p>저녁 뭐 먹죠1-2-1</p>
                                                    </div>
                                                    <div className="comment_util">
                                                        <button type="button" className="btn_type11">수정</button>
                                                        <button type="button" className="btn_type12">삭제</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        <div className="comment_item">
                            <div className="profile">
                                <ul className="comment_info">
                                    <li>
                                        <strong>관리자aaaa</strong>
                                    </li>
                                    <li>
                                        <em>2023.07.23</em>
                                    </li>
                                    <li>
                                        <button type="button" className="btn_write_comment">답글쓰기</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="con_comment">
                                <p>저녁 뭐 먹죠2</p>
                            </div>
                            <div className="comment_util">
                                <button type="button" className="btn_type11">수정</button>
                                <button type="button" className="btn_type12">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="write_comment_wrap">
                    <div className="writer_wrap">
                        <div className="writer_info">
                            {/* 로그인 했을 경우 strong태그에 user_name추가 */}
                            <strong className="user_name">관리자</strong>
                        </div>
                    </div>
                    <div className="write_comment">
                        <div className="textarea_box">
                            <textarea name="" id="" cols="30" rows="4" placeholder="댓글을 입력해주세요."></textarea>
                            <span className="char_cnt">0 / 300</span>
                        </div>
                        <button type="button" className="btn_type14">등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentWrap;