const Main = () => {
    return(
        <div className="page_admin_main">
            <div className="main_con_wrap">
                <div className="main_con">
                    <div className="tit">
                        <h3>최근 게시글 정보</h3>
                    </div>
                    <div className="total_num_box">
                        <ul>
                            <li>
                                <span>총 게시글</span>
                                <strong><b>36</b> 개</strong>
                            </li>
                            <li>
                                <span>금일 게시글</span>
                                <strong><b>2</b> 개</strong>
                            </li>
                            <li>
                                <span>총 댓글</span>
                                <strong><b>1,024</b> 개</strong>
                            </li>
                            <li>
                                <span>금일 댓글</span>
                                <strong><b>0</b> 개</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="board_box">
                        <h4>최근 게시판 조회</h4>
                        <div className="tbl_wrap1">
                            <table>
                                <caption>최근 게시판 조회</caption>
                                <colgroup>
                                    <col style={{width: "12%"}}/>
                                    <col style={{width: "18%"}}/>
                                    <col style={{width: "auto"}}/>
                                    <col style={{width: "30%"}}/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>게시판명</th>
                                        <th>제목</th>
                                        <th>작성일시</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>5</td>
                                        <td>1:1 문의</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <a href="#" rel="noopener noreferrer">문의드립니다.</a>
                                                </span>
                                            </div>
                                        </td>
                                        <td>2023.07.27 11:09:56</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>공지사항</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <a href="#" rel="noopener noreferrer">문의드립니다.</a>
                                                </span>
                                            </div>
                                        </td>
                                        <td>2023.07.27 11:09:56</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>1:1 문의</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <a href="#" rel="noopener noreferrer">문의드립니다.</a>
                                                </span>
                                            </div>
                                        </td>
                                        <td>2023.07.27 11:09:56</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>1:1 문의</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <a href="#" rel="noopener noreferrer">문의드립니다.</a>
                                                </span>
                                            </div>
                                        </td>
                                        <td>2023.07.27 11:09:56</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1:1 문의</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <a href="#" rel="noopener noreferrer">문의드립니다.</a>
                                                </span>
                                            </div>
                                        </td>
                                        <td>2023.07.27 11:09:56</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="#" rel="noopener noreferrer" className="btn_more">더보기</a>
                    </div>
                </div>
                <div className="main_con">
                        <div className="tit">
                            <h3>최근 접속자 정보</h3>
                        </div>
                        <div className="total_num_box">
                            <ul>
                                <li>
                                    <span>총 가입회원</span>
                                    <strong><b>22</b> 명</strong>
                                </li>
                                <li>
                                    <span>금일 가입회원</span>
                                    <strong><b>1</b> 명</strong>
                                </li>
                                <li>
                                    <span>총 방문</span>
                                    <strong><b>5,204</b> 명</strong>
                                </li>
                                <li>
                                    <span>금일 방문</span>
                                    <strong><b>64</b> 명</strong>
                                </li>
                            </ul>
                        </div>
                        <div className="board_box">
                            <h4>접속자 이력 조회</h4>
                            <div className="tbl_wrap1">
                                <table>
                                    <caption>접속자 이력 조회</caption>
                                    <colgroup>
                                        <col style={{width: "12.12%"}}/>
                                        <col style={{width: "27.27%"}}/>
                                        <col style={{width: "auto"}}/>
                                        <col style={{width: "30.30%"}}/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>접속자</th>
                                            <th>접속 IP</th>
                                            <th>접속 브라우저</th>
                                            <th>접속일시</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>이희승</td>
                                            <td>124.194.143.107</td>
                                            <td>
                                                <div className="txt_left">
                                                    <span>
                                                        Mozilla/5.0 (Windows NT ...
                                                    </span>
                                                </div>
                                            </td>
                                            <td>2023.07.27 11:09:56</td>
                                        </tr>
                                        <tr>
                                            <td>박종성</td>
                                            <td>124.194.143.107</td>
                                            <td>
                                                <div className="txt_left">
                                                    <span>
                                                        Mozilla/5.0 (Windows NT ...
                                                    </span>
                                                </div>
                                            </td>
                                            <td>2023.07.27 11:09:56</td>
                                        </tr>
                                        <tr>
                                            <td>박종성</td>
                                            <td>124.194.143.107</td>
                                            <td>
                                                <div className="txt_left">
                                                    <span>
                                                        Mozilla/5.0 (Windows NT ...
                                                    </span>
                                                </div>
                                            </td>
                                            <td>2023.07.27 11:09:56</td>
                                        </tr>
                                        <tr>
                                            <td>박종성</td>
                                            <td>124.194.143.107</td>
                                            <td>
                                                <div className="txt_left">
                                                    <span>
                                                        Mozilla/5.0 (Windows NT ...
                                                    </span>
                                                </div>
                                            </td>
                                            <td>2023.07.27 11:09:56</td>
                                        </tr>
                                        <tr>
                                            <td>박종성</td>
                                            <td>124.194.143.107</td>
                                            <td>
                                                <div className="txt_left">
                                                    <span>
                                                        Mozilla/5.0 (Windows NT ...
                                                    </span>
                                                </div>
                                            </td>
                                            <td>2023.07.27 11:09:56</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <a href="#" rel="noopener noreferrer" className="btn_more">더보기</a>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Main;