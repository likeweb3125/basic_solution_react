import { useDispatch, useSelector } from "react-redux";
import { notiPop } from "../../../store/popupSlice";

const NotiPop = (props) => {
    const dispatch = useDispatch();

    //팝업닫기
    const closePopHandler = () => {
        dispatch(notiPop(false));
    };
    
    return(
        <div className="pop_noti">
            <h5>알림</h5>
            <div className="pop_inner">
                <ul className="tab_noti">
                    <li className="on"><button type="button">전체</button></li>
                    <li><button type="button">게시글</button></li>
                    <li><button type="button">댓글</button></li>
                </ul>
                <div className="noti_box">
                    <div className="noti_util">
                        <span>알림이 총 <b>344</b>개가 있습니다.</span>                                                
                        <ul className="btn_wrap">
                            <li>
                                <button type="button">전체 읽기</button>
                            </li>
                            <li>
                                <button type="button">읽은 알림 삭제</button>
                            </li>
                        </ul>
                    </div>
                    <ul className="list_noti">
                        {/* 읽은 표시 read class */}
                        <li>
                            <div className="cate">댓글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                        <li>
                            <div className="cate">게시글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                        <li>
                            <div className="cate">댓글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                        <li>
                            <div className="cate">게시글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                        <li>
                            <div className="cate">댓글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                        <li>
                            <div className="cate">게시글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                        <li className="read">
                            <div className="cate">게시글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                        <li className="read">
                            <div className="cate">게시글</div>
                            <div className="txt_wrap">
                                <a href="#" rel="noopener noreferrer">
                                    <em>[공지사항] ‘8월 9일(수) 확인된 현상 안내’ 댓글 작성</em>
                                    <strong>
                                        <b>이선영</b>
                                        <span>알려 주셔서 감사합니다!</span>
                                    </strong>
                                    <i>2023.07.23</i>
                                </a>
                            </div>
                            <button type="button" className="btn_noti_remove">알림 삭제</button>
                        </li>
                    </ul>
                </div>
            </div>
            <button type="button" className="btn_noti_close" onClick={closePopHandler}>알림팝업 닫기</button>
        </div>
    );
};

export default NotiPop;