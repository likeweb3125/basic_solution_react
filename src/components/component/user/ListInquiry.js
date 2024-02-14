import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { scrollY } from "../../../store/etcSlice";
import * as CF from "../../../config/function";


const ListInquiry = ({columnTitle, columnDate, columnView, columnFile, columnGroup, list, onDetailToggleHandler, detailData}) => {
    const dispatch = useDispatch();
    const { menu_idx } = useParams();



    return(<>
        <ul className="list_board">
            {list && list.length > 0 ? 
                list.map((cont,i)=>{
                    let box = false;
                    if(Object.keys(detailData).length > 0 && detailData.idx === cont.idx){
                        box = true;
                    }

                    return(
                        <li key={i}>
                            <div className="item_box">
                                <div className="item_txt">
                                    <div className="item_num">
                                        <em className={`answer_status${cont.g_status == '답변완료' ? ' txt_color1' : ''}`}>{cont.g_status}</em>
                                    </div>
                                    <div className="item_link">
                                        {columnTitle && <>
                                            <span>
                                                <button type="button"
                                                    onClick={()=>{
                                                        onDetailToggleHandler(cont.b_secret, cont.idx, box);
                                                    }}
                                                >{columnGroup && '['+cont.g_name+'] '}{cont.b_title}</button>
                                            </span>
                                            {cont.b_secret == 'Y' && <i>잠금 게시물</i>}
                                        </>}
                                    </div>
                                </div>
                                <ul className="item_util">
                                    <li className="item_name">{cont.m_name}</li>
                                    {columnView && <li className="item_cnt">{CF.MakeIntComma(cont.b_view)}</li>}
                                    {columnDate && <li className="item_date">{cont.b_reg_date}</li>}
                                </ul>
                            </div>
                            {Object.keys(detailData).length > 0 && detailData.idx === cont.idx &&
                                <div className="answer_box">
                                    <div className="q_box">
                                        <div dangerouslySetInnerHTML={{__html:detailData.b_contents}}></div>
                                        <div className="btn_util">
                                            <Link 
                                                to={`/sub/inquiry/modify/${menu_idx}/${cont.idx}`} 
                                                className="btn_type11"
                                                onClick={()=>{dispatch(scrollY(window.scrollY))}}
                                            >수정</Link>
                                            <button type="button" className="btn_type12">삭제</button>
                                        </div>
                                    </div>
                                    <div className="a_box">
                                        <div className="answer_info">
                                            <b>답변</b>
                                            <span>담당자</span>
                                            {/* <span>2023.07.23</span> */}
                                        </div>
                                        <p>{detailData.b_reply}</p>
                                    </div>
                                </div>
                            }
                        </li>
                    );
                })
                : <div className="none_data">데이터가 없습니다.</div>
            }
        </ul>
    </>);
};

export default ListInquiry;