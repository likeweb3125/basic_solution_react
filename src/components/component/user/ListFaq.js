import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { scrollY } from "../../../store/etcSlice";
import * as CF from "../../../config/function";


const ListFaq = ({columnTitle, columnDate, columnView, columnFile, columnGroup, list, onDetailToggleHandler, detailData}) => {
    const dispatch = useDispatch();
    const { menu_idx } = useParams();



    return(<>
        <ul className="list_board">
            {list && list.length > 0 ? 
                list.map((cont,i)=>{

                    return(
                        <li key={i} className="on">
                            <div className="item_box">
                                <div className="item_txt">
                                    <div className="item_num">
                                        <em className="txt_category txt_color1">회원</em>
                                    </div>
                                    <div className="item_link">
                                        <span>
                                            <a href="#">회원 가입시 회원 인증 메일이 도착하지 않았어요.</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="answer_box">
                                <div className="a_box">
                                    <p>회원가입이 정상적으로 완료된 경우 정상 회원등록 완료</p>
                                </div>
                            </div>
                        </li>
                    );
                })
                : <div className="none_data">데이터가 없습니다.</div>
            }
        </ul>
    </>);
};

export default ListFaq;