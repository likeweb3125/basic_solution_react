import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { checkedList, scrollY } from "../../../store/etcSlice";
import { adminPolicyPop, adminPopupPop, adminBannerPop } from "../../../store/popupSlice";


const TableWrap = (props) => {
    const dispatch = useDispatch();
    const etc = useSelector((state)=>state.etc);
    const api_uri = enum_api_uri.api_uri;
    const [colgroup, setColgroup] = useState([]);
    const [thList, setThList] = useState([]);

    
    //체크박스 체크시
    const checkHandler = async (checked, value) => {
        const val = parseInt(value, 10); //input의 value 가 문자열로 처리됨으로 숫자로 변경해줌
        let newList = etc.checkedList;
        if(checked){
            newList = newList.concat(val);
        }else if(!checked && newList.includes(val)){
            newList = newList.filter((el)=>el !== val);
        }
        dispatch(checkedList(newList));
    };



    useEffect(()=>{
        const list = props.colgroup;
        
        //문의게시판일때 colgroup 추가 (답변상태)
        if(props.type === "board" && props.data.c_content_type === 7){
            list.splice(2,0,"100px");
        }

        //게시판분류 사용시 colgroup 추가 (분류유형)
        if(props.type === "board" && props.data.b_group == "Y"){
            const index = list.length - 3; //뒤에서 3번째에 추가
            list.splice(index,0,"12%");
        }

        setColgroup(list);
    },[props.colgroup]);



    useEffect(()=>{
        const list = props.thList;

        //문의게시판일때 th 추가 (답변상태)
        if(props.type === "board" && props.data.c_content_type === 7){
            list.splice(2,0,"답변상태");
        }

        //게시판분류 사용시 th 추가 (분류유형)
        if(props.type === "board" && props.data.b_group == "Y"){
            const index = list.length - 3; //뒤에서 3번째에 추가
            list.splice(index,0,"분류유형");
        }

        setThList(list);
    },[props.thList]);
    

    return(
        <div className={props.class}>
            {props.tdList && props.tdList.length > 0 ?
                <table>
                    <colgroup>
                        {colgroup.map((cont,i)=>{
                            return(<col key={i} style={{width: cont}}/>);
                        })}
                    </colgroup>
                    <thead>
                        <tr>
                            {props.thList.map((cont,i)=>{
                                return(<th key={i}>{cont}</th>);
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.tdList && props.tdList.map((cont,i)=>{
                            //메인페이지 최근게시판조회 일때
                            if(props.type === "main_board"){
                                return(
                                    <tr key={i}>
                                        <td>{cont.idx}</td>
                                        <td>{cont.c_name}</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <Link to={`/console/board/post/detail/${cont.category}/${cont.idx}`}>{cont.b_title}</Link>
                                                </span>
                                            </div>
                                        </td>
                                        <td>{cont.month}</td>
                                    </tr>
                                );
                            }
                            //메인페이지 접속자이력조회 일때
                            if(props.type === "main_connector"){
                                return(
                                    <tr key={i}>
                                        <td>{cont.user}</td>
                                        <td>{cont.clientIp}</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>{cont.userAgent}</span>
                                            </div>
                                        </td>
                                        <td>{cont.reg_date}</td>
                                    </tr>
                                );
                            }
                            //게시판관리 - 게시글관리 일때
                            if(props.type === "board"){
                                let type;
                                if(cont.c_content_type === 4){
                                    type = "일반";
                                }else if(cont.c_content_type === 5){
                                    type = "갤러리";
                                }else if(cont.c_content_type === 6){
                                    type = "FAQ";
                                }else if(cont.c_content_type === 7){
                                    type = "문의";
                                }
                                return(
                                    <tr key={i}>
                                        <td>
                                            <div className="chk_box2">
                                                <input type="checkbox" id={`check_${cont.idx}`} className="blind"
                                                    value={cont.idx}
                                                    onChange={(e) => {
                                                        const isChecked = e.currentTarget.checked;
                                                        const value = e.currentTarget.value;
                                                        checkHandler(isChecked, value);
                                                    }}
                                                    checked={etc.checkedList.includes(cont.idx)}
                                                />
                                                <label htmlFor={`check_${cont.idx}`}>선택</label>
                                            </div>
                                        </td>
                                        <td>{cont.num}</td>
                                        {type == "문의" && 
                                            <td><em className={`answer_status${cont.g_status == "답변완료" ? " on" : ""}`}>{cont.g_status}</em></td>
                                        }
                                        <td>
                                            <div className="txt_left">
                                                <span onClick={()=>{dispatch(scrollY(window.scrollY))}}>
                                                    <Link to={`/console/board/post/detail/${cont.category}/${cont.idx}`}>{cont.b_title}</Link>
                                                </span>
                                                {cont.comment_count > 0 && <b>({CF.MakeIntComma(cont.comment_count)})</b>}
                                            </div>
                                        </td>
                                        <td>{type}</td>
                                        {props.data.b_group == "Y"  &&
                                            <td>{cont.g_name}</td>
                                        }
                                        <td>
                                            <button className="link">{cont.m_name}</button>
                                        </td>
                                        <td>
                                            <span className="txt_light">{cont.b_reg_date}</span>
                                        </td>
                                        <td>
                                            <button type="button" 
                                                className={`btn_type10${cont.b_notice == '1' ? " on" : ""}`}
                                                onClick={()=>props.onNotiSettingHandler(cont)}
                                            >{`공지${cont.b_notice == '1' ? " 해제" : " 설정"}`}</button>
                                        </td>
                                    </tr>
                                );
                            }
                            //환경설정 - 운영정책설정 일때
                            if(props.type === "policy"){
                                return(
                                    <tr key={i} className={cont.p_use_yn == "Y" ? "" : "disabled"}>
                                        <td>
                                            <div className="chk_box2">
                                                <input type="checkbox" id={`check_${cont.idx}`} className="blind"
                                                    value={cont.idx}
                                                    onChange={(e) => {
                                                        const isChecked = e.currentTarget.checked;
                                                        const value = e.currentTarget.value;
                                                        checkHandler(isChecked, value);
                                                    }}
                                                    checked={etc.checkedList.includes(cont.idx)}
                                                />
                                                <label htmlFor={`check_${cont.idx}`}>선택</label>
                                            </div>
                                        </td>
                                        <td>{cont.idx}</td>
                                        <td>
                                            <button type="button" className="link" 
                                                onClick={()=>{
                                                    dispatch(adminPolicyPop({adminPolicyPop:true,adminPolicyPopIdx:cont.idx}));
                                                }}>
                                                <span>{cont.p_title}</span>
                                            </button>
                                        </td>
                                        <td>
                                            <span className="txt_light">{cont.p_reg_date}</span>
                                        </td>
                                        <td>
                                            {cont.p_use_yn == "Y" ? <em className="txt_color1">노출</em>
                                                :   <em className="txt_color2">중단</em>
                                            }
                                        </td>
                                    </tr>
                                );
                            }
                            //디자인관리 - 메인배너관리 일때
                            if(props.type === "banner"){
                                const file = api_uri+cont.b_file;

                                return(
                                    <tr key={i} className={cont.b_open[0] == "Y" ? "" : "disabled"}>
                                        <td>
                                            <div className="chk_box2">
                                                <input type="checkbox" id={`check_${cont.idx}`} className="blind"
                                                    value={cont.idx}
                                                    onChange={(e) => {
                                                        const isChecked = e.currentTarget.checked;
                                                        const value = e.currentTarget.value;
                                                        checkHandler(isChecked, value);
                                                    }}
                                                    checked={etc.checkedList.includes(cont.idx)}
                                                />
                                                <label htmlFor={`check_${cont.idx}`}>선택</label>
                                            </div>
                                        </td>
                                        <td>
                                            {cont.b_file &&
                                                <div className="img_box">
                                                    <img src={file} alt="썸네일이미지" />
                                                </div>
                                            }
                                        </td>
                                        <td>
                                            <button type="button" className="link" 
                                                onClick={()=>{
                                                    dispatch(adminBannerPop({adminBannerPop:true,adminBannerPopIdx:cont.idx,adminBannerPopType:props.popType}));
                                                }}>{cont.b_title}</button>
                                        </td>
                                        <td>{cont.b_s_date}{cont.b_e_date && " ~ "+cont.b_e_date}</td>
                                        <td>커버</td>
                                        <td>
                                            <em className={cont.b_open[0] == "Y" ? "txt_color1" : "txt_color2"}>{cont.b_open[1]}</em>
                                        </td>
                                        <td><button type="button" className="btn_move">카테고리 이동</button></td>
                                    </tr>
                                );
                            }
                            //디자인관리 - 팝업관리 일때
                            if(props.type === "popup"){
                                return(
                                    <tr key={i} className={cont.p_open[0] == "Y" ? "" : "disabled"}>
                                        <td>
                                            <div className="chk_box2">
                                                <input type="checkbox" id={`check_${cont.idx}`} className="blind"
                                                    value={cont.idx}
                                                    onChange={(e) => {
                                                        const isChecked = e.currentTarget.checked;
                                                        const value = e.currentTarget.value;
                                                        checkHandler(isChecked, value);
                                                    }}
                                                    checked={etc.checkedList.includes(cont.idx)}
                                                />
                                                <label htmlFor={`check_${cont.idx}`}>선택</label>
                                            </div>
                                        </td>
                                        <td>{cont.idx}</td>
                                        <td>
                                            <button type="button" className="link" 
                                                onClick={()=>{
                                                    dispatch(adminPopupPop({adminPopupPop:true,adminPopupPopIdx:cont.idx,adminPopupPopType:props.popType}));
                                                }}>{cont.p_title}</button>
                                        </td>
                                        <td>{cont.p_s_date}{cont.p_e_date && " ~ "+cont.p_e_date}</td>
                                        <td>{`${cont.p_width_size} X ${cont.p_height_size}`} / {cont.p_one_day == "Y" ? "사용" : "미사용"}</td>
                                        <td>{props.popType == "P" && `${cont.p_left_point} X ${cont.p_top_point}`}</td>
                                        <td>
                                            <em className={cont.p_open[0] == "Y" ? "txt_color1" : "txt_color2"}>{cont.p_open[1]}</em>
                                        </td>
                                        <td>{cont.p_layer_pop[1]}</td>
                                    </tr>
                                );
                            }
                            //유지보수게시판 일때
                            if(props.type === "maint"){
                                let color ="";
                                if(cont.process == "처리완료"){
                                    color = " txt_color1";
                                }
                                if(cont.process == "접수완료"){
                                    color = " txt_color3";
                                }
                                if(cont.process == "재요청"){
                                    color = " txt_color2";
                                }
                                if(cont.process == "검토중"){
                                    color = " txt_color4";
                                }

                                return(
                                    <tr key={i}>
                                        <td>1</td>
                                        <td>
                                            <div className="txt_left">
                                                <span onClick={()=>{dispatch(scrollY(window.scrollY))}}>
                                                    <Link to={`/console/maint/detail/${cont.list_no}`}>{cont.subject}</Link>
                                                    {cont.comment_count > 0 && <b>({CF.MakeIntComma(cont.comment_count)})</b>}
                                                </span>
                                            </div>
                                        </td>
                                        <td>{cont.name}</td>
                                        <td>
                                            <em className={`maint_status${color}`}>{cont.process}</em>
                                        </td>
                                        <td>
                                            <span className="txt_light">{cont.w_date}</span>
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
                : props.tdList && props.tdList.length === 0 && <div className="none_data">게시글이 없습니다.</div>
            }
        </div>
    );
};

export default TableWrap;