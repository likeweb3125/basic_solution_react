import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { currentPage } from "../../store/commonSlice";

import SelectBox from "../../components/component/admin/SelectBox";
import SearchInput from "../../components/component/admin/SearchInput";
import TableWrap from "../../components/component/admin/TableWrap";


const Board = (props) => {
    const dispatch = useDispatch();
    const common = useSelector((state)=>state.common);
    const [boardTit, setBoardTit] = useState("");
    const [valSearch, setValSearch] = useState("");


    //페이지 제목 가져오기
    useEffect(()=>{
        setBoardTit(props.tit);
    },[props.tit]);


    //제목 셀렉트박스 변경시 페이지변경
    const titSelectChangeHandler = (val) => {
        setBoardTit(val);

        let idx = common.boardMenu.indexOf(val);
            idx = idx + 1;
        dispatch(currentPage(`board1_${idx}`));
    };


    //검색어 input값 변경시
    const onSearchChangeHandler = (e) => {
        const val = e.currentTarget.value;
        setValSearch(val);
    };



    return(
        <div className="page_admin_board">
        <div className="content_box">
            <div className="tit">
                <h3>
                    <b>{boardTit}</b>
                    <SelectBox 
                        class="tit_select"
                        list={common.boardMenu}
                        selected={boardTit}
                        onChangeHandler={(e)=>{
                            titSelectChangeHandler(e.currentTarget.value);
                        }}
                        selHidden={true}
                    />
                </h3>
                <strong>총 20개</strong>
            </div>
            <div className="board_section">
                <div className="form_search_wrap">
                    <Formik
                        initialValues={{
                            limit: "10개씩",
                        }}
                        // validationSchema={validationSchema}
                        // onSubmit={submit}
                    >
                        {({values, handleChange, handleBlur, errors, touched, setFieldValue, handleReset, resetForm}) => (
                            <form>
                                <div className="search_wrap">
                                    <SelectBox 
                                        class="select_type3 search_row_select"
                                        list={["10개씩","15개씩","30개씩","50개씩"]}
                                        selected={values.limit}
                                        onChangeHandler={handleChange}
                                        name="limit"
                                        selHidden={true}
                                    />
                                    <div className="search_box">
                                        <SelectBox 
                                            class="select_type3"
                                            list={["제목만","제목 + 내용","작성자"]}
                                            // selected={values.j_address}
                                            // onChangeHandler={handleChange}
                                            // name="j_address"
                                            selHidden={true}
                                        />
                                        <SearchInput 
                                            placeholder="검색어를 입력해주세요."
                                            onChangeHandler={onSearchChangeHandler}
                                            value={valSearch}
                                            onClickHandler={()=>{}}
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="board_table_util">
                    <div className="chk_area">
                        <div className="chk_box2">
                            <input type="checkbox" id="chkAll" className="blind"/>
                            <label htmlFor="chkAll">전체선택</label>
                        </div>
                    </div>
                    <div className="util_wrap">
                        <span>선택한 게시글</span>
                        <span>총 <b>0</b>개</span>
                        <SelectBox 
                            class="select_type3"
                            list={["1:1 문의하기"]}
                            // selected={values.j_address}
                            // onChangeHandler={handleChange}
                            // name="j_address"
                            selHidden={true}
                        />
                        <span>(으)로</span>
                        <button type="button" className="btn_type8">이동</button>
                        <em>※ 게시판 유형이 동일할 시에만 게시글 이동이 가능합니다.</em>
                    </div>
                    <div className="util_right">
                        <button type="button" className="btn_type9">삭제</button>
                    </div>
                </div>
                <TableWrap 
                    class="tbl_wrap1"
                    colgroup={["80px","10%","auto","12%","9%","13%","13%"]}
                    thList={["","번호","제목","게시판 유형","작성자","작성일시","공지 설정"]}
                    tdList={[1,2,3,4,5]}
                    type={"notice"}
                />
                <div className="tbl_wrap1">
                    <table>
                        <caption>게시판 테이블</caption>
                        <colgroup>
                            <col style={{width: "80px"}}/>
                            <col style={{width: "10%"}}/>
                            <col style={{width: "auto"}}/>
                            <col style={{width: "12%"}}/>
                            <col style={{width: "9%"}}/>
                            <col style={{width: "13%"}}/>
                            <col style={{width: "13%"}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th></th>
                                <th>번호</th>
                                <th>제목</th>
                                <th>게시판 유형</th>
                                <th>작성자</th>
                                <th>작성일시</th>
                                <th>공지 설정</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk11" className="blind"/>
                                        <label htmlFor="chk11">선택</label>
                                    </div>
                                </td>
                                <td>공지</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                        <b>(1)</b>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    {/* <button type="button" className="btn_type10 on">공지 설정</button> */}
                                    <button type="button" className="btn_type10 on">공지 해제</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>20</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>19</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>18</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>17</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>16</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>15</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>14</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>13</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>12</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="chk_box2">
                                        <input type="checkbox" id="chk12" className="blind"/>
                                        <label htmlFor="chk12">선택</label>
                                    </div>
                                </td>
                                <td>11</td>
                                <td>
                                    <div className="txt_left">
                                        <span>
                                            <a href="#">문의드립니다.</a>
                                        </span>
                                    </div>
                                </td>
                                <td>일반</td>
                                <td>
                                    <a href="#">김은비</a>
                                </td>
                                <td>
                                    <span className="txt_light">2018.10.10 10:20</span>
                                </td>
                                <td>
                                    <button type="button" className="btn_type10">공지 설정</button>
                                    {/* <button type="button" className="btn_type10 on">공지 해제</button> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="paging">
                    <a href="#" className="btn_prev btn_paging">이전</a>
                    <strong>1</strong>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#" className="btn_next btn_paging">다음</a>
                </div>
                <div className="board_btn_wrap">
                    <a href="#" className="btn_type4">작성하기</a>                                        
                </div>
            </div>
        </div>
    </div>
    );
};

export default Board;