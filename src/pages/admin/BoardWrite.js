const BoardWrite = () => {
    return(
        <div className="page_admin_board">
            <div className="content_box">
                <div className="tit">
                    <h3>
                        <b>공지사항</b>
                    </h3>
                </div>
                <div className="board_section">
                    <div className="board_write">
                        <div className="tbl_wrap2">
                            <table>
                                <caption>게시판 작성 테이블</caption>
                                <colgroup>
                                    <col style={{width: "140px"}}/>
                                    <col style={{width: "auto"}}/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>제목</th>
                                        <td>
                                            <div className="input_box">
                                                <span className="char_cnt">8 / 40</span>
                                                <input type="text"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>공지 설정</th>
                                        <td>
                                            <div className="chk_box1">
                                                <input type="checkbox" id="chkNotice" className="blind"/>
                                                <label for="chkNotice">체크 시 목록 최상단 노출</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div className="edit" style={{height: "400px"}}>
                                                에디터
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>파일첨부</th>
                                        <td>
                                            <div className="file_box2">
                                                <div className="input_file">
                                                    <input type="file" id="file11" className="blind"/>
                                                    <label for="file11">
                                                        <b>파일을 마우스로 끌어 오세요.</b>
                                                        <strong>파일선택</strong>
                                                    </label>
                                                </div>
                                                <ul className="file_txt">
                                                    <li>
                                                        <span>이미지.JPG</span>
                                                        <button type="button" className="btn_file_remove">파일삭제</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="tr_pwd">
                                        <th>비밀번호</th>
                                        <td>
                                            <div className="pwd_wrap">
                                                <div className="input_box">
                                                    <input type="password"/>
                                                </div>
                                                <div className="chk_box1">
                                                    <input type="checkbox" id="chkPwd" className="blind"/>
                                                    <label for="chkPwd">비밀글(관리자만 볼 수 있습니다.)</label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="form_btn_wrap">
                            <a href="#" className="btn_type3">취소</a>
                            <a href="#" className="btn_type4">등록</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardWrite;