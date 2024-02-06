import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";


const Board = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const board_list = enum_api_uri.board_list;
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const { menu_id } = useParams();
    const [confirm, setConfirm] = useState(false);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //게시판정보 가져오기
    const getBoardData = (page) => {

        axios.get(`${board_list.replace(":category",menu_id).replace(":limit",10)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            if(error.response.status === 401){//토큰에러시 관리자단 로그인페이지로 이동
                navigate("/console/login");
            }else{
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt: err_msg,
                    confirmPopBtn:1,
                }));
                setConfirm(true);
            }
        });
    };


    useEffect(()=>{
        getBoardData();
    },[]);



    return(<>
        <div className="page_user_board">
            <div className="section_inner">
                <div className="board_section">
                    <div className="search_wrap">
                        <div className="search_box">
                            <div className="search_input">
                                <div className="input_box">
                                    <input type="text" placeholder="검색어를 입력해주세요."/>
                                </div>
                                <button type="button" className="btn_search">검색하기</button>
                            </div>
                        </div>
                    </div>
                    <div className="list_board_wrap">
                        <div className="board_util">
                            <em className="txt_total">전체 10건</em>
                        </div>
                        <ul className="list_board">
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <em className="notice">공지</em>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>10</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>9</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>8</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>7</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>6</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>5</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>4</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>3</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>2</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="item_box">
                                    <div className="item_txt">
                                        <div className="item_num">
                                            <span>1</span>
                                        </div>
                                        <div className="item_link">
                                            <span>
                                                <a href="#">7월 23일 시스템 정기 점검</a>
                                            </span>
                                            <b>37</b>
                                        </div>
                                    </div>
                                    <ul className="item_util">
                                        <li className="item_file">
                                            <div className="ic">
                                                <img src="images/ic_clip.svg" alt="file icon"/>
                                            </div>
                                        </li>
                                        <li className="item_name">관리자</li>
                                        <li className="item_cnt">37</li>
                                        <li className="item_date">2023.07.23</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
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
                </div>
            </div>
        </div>
    </>);
};

export default Board;