import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import InputBox from "../../components/component/admin/InputBox";
import ConfirmPop from "../../components/popup/ConfirmPop";


const SettingPolicy = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const [confirm, setConfirm] = useState(false);



    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    return(<>
        <div className="page_admin_setting">
            <div className="content_box">
                <div className="tit tit2">
                    <h3>
                        <b>운영정책</b>
                    </h3>
                    <strong>총 5개</strong>
                </div>
                <div className="board_section">
                    <div className="form_search_wrap">
                        <div className="search_wrap">
                            <div className="select_type3 search_row_select">
                                <select name="" id="" title="행 개수">
                                    <option value="">10개씩</option>
                                    <option value="">15개씩</option>
                                    <option value="">30개씩</option>
                                    <option value="">50개씩</option>
                                </select>
                            </div>
                            <div className="search_box">
                                <div className="select_type3">
                                    <select name="" id="" title="검색 범위">
                                        <option value="">제목만</option>
                                        <option value="">제목 + 내용</option>
                                    </select>
                                </div>
                                <div className="search_input">
                                    <div className="input_box">
                                        <input type="text" placeholder="검색어를 입력해주세요."/>
                                    </div>
                                    <button type="button" className="btn_search">검색하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="board_table_util">
                        <div className="chk_area">
                            <div className="chk_box2">
                                <input type="checkbox" id="chkAll" className="blind"/>
                                <label for="chkAll">전체선택</label>
                            </div>
                        </div>
                        <div className="util_wrap">
                            <span>선택한 운영정책</span>
                            <span>총 <b>0</b>명</span>
                            <div className="btn_box">
                                {/* <button type="button" className="btn_type18">노출</button> */}
                                <button type="button" className="btn_type18 on">노출</button>
                                <button type="button" className="btn_type19">중단</button>
                                {/* <button type="button" className="btn_type19 on">중단</button> */}
                            </div>
                        </div>
                        <div className="util_right">
                            <button type="button" className="btn_type9">삭제</button>
                        </div>
                    </div>
                    <div className="tbl_wrap1 tbl_wrap1_1">
                        <table>
                            <caption>게시판 테이블</caption>
                            <colgroup>
                                <col style={{width: "80px"}}/>
                                <col style={{width: "9%"}}/>
                                <col style={{width: "auto"}}/>
                                <col style={{width: "18%"}}/>
                                <col style={{width: "12%"}}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>구분</th>
                                    <th>제목</th>
                                    <th>작성일시</th>
                                    <th>사용여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="chk_box2">
                                            <input type="checkbox" id="chk11" className="blind"/>
                                            <label for="chk11">선택</label>
                                        </div>
                                    </td>
                                    <td>5</td>
                                    <td>
                                        <a href="#">이용약관</a>
                                    </td>
                                    <td>
                                        <span className="txt_light">2018.10.10 10:20</span>
                                    </td>
                                    <td>
                                        <em className="txt_color1">노출</em>
                                        {/* <em className="txt_color2">중단</em> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="chk_box2">
                                            <input type="checkbox" id="chk11" className="blind"/>
                                            <label for="chk11">선택</label>
                                        </div>
                                    </td>
                                    <td>4</td>
                                    <td>
                                        <a href="#">개인정보 수집 및 이용</a>
                                    </td>
                                    <td>
                                        <span className="txt_light">2018.10.10 10:20</span>
                                    </td>
                                    <td>
                                        <em className="txt_color1">노출</em>
                                        {/* <em className="txt_color2">중단</em> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="chk_box2">
                                            <input type="checkbox" id="chk11" className="blind"/>
                                            <label for="chk11">선택</label>
                                        </div>
                                    </td>
                                    <td>3</td>
                                    <td>
                                        <a href="#">개인정보 제3자 제공</a>
                                    </td>
                                    <td>
                                        <span className="txt_light">2018.10.10 10:20</span>
                                    </td>
                                    <td>
                                        <em className="txt_color1">노출</em>
                                        {/* <em className="txt_color2">중단</em> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="chk_box2">
                                            <input type="checkbox" id="chk11" className="blind"/>
                                            <label for="chk11">선택</label>
                                        </div>
                                    </td>
                                    <td>2</td>
                                    <td>
                                        <a href="#">개인정보 취급위탁</a>
                                    </td>
                                    <td>
                                        <span className="txt_light">2018.10.10 10:20</span>
                                    </td>
                                    <td>
                                        <em className="txt_color1">노출</em>
                                        {/* <em className="txt_color2">중단</em> */}
                                    </td>
                                </tr>
                                <tr className="disabled">
                                    <td>
                                        <div className="chk_box2">
                                            <input type="checkbox" id="chk11" className="blind"/>
                                            <label for="chk11">선택</label>
                                        </div>
                                    </td>
                                    <td>1</td>
                                    <td>
                                        <a href="#">비회원 정보수집 동의</a>
                                    </td>
                                    <td>
                                        <span className="txt_light">2018.10.10 10:20</span>
                                    </td>
                                    <td>
                                        {/* <em className="txt_color1">노출</em> */}
                                        <em className="txt_color2">중단</em>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="form_btn_wrap">
                        <a href="#" className="btn_type4">작성</a>                                        
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default SettingPolicy;