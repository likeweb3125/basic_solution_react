import { useDispatch, useSelector } from "react-redux";
import * as CF from "../../../config/function";
import { checkedList } from "../../../store/etcSlice";
import { currentPage } from "../../../store/commonSlice";


const TableWrap = (props) => {
    const dispatch = useDispatch();
    const common = useSelector((state)=>state.common);
    const etc = useSelector((state)=>state.etc);

    
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
    

    return(
        <div className={props.class}>
            {props.tdList && props.tdList.length > 0 ?
                <table>
                    <colgroup>
                        {props.colgroup.map((cont,i)=>{
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
                            if(props.type == "main_board"){
                                return(
                                    <tr key={i}>
                                        <td>{cont.idx}</td>
                                        <td>{cont.c_name}</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <a href="#" rel="noopener noreferrer">{cont.b_title}</a>
                                                </span>
                                            </div>
                                        </td>
                                        <td>{cont.month}</td>
                                    </tr>
                                );
                            }
                            //메인페이지 접속자이력조회 일때
                            if(props.type == "main_connector"){
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
                            if(props.type == "board"){
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
                                        <td>{cont.b_notice == "1" ? "공지" : cont.idx}</td>
                                        <td>
                                            <div className="txt_left">
                                                <span>
                                                    <button className="link"
                                                        onClick={()=>{
                                                            let page = {...common.currentPage};
                                                                page.detail = true;
                                                                page.write = false;
                                                            dispatch(currentPage(page));
                                                        }}
                                                    >{cont.b_title}</button>
                                                </span>
                                                {cont.comment_count > 0 && <b>({CF.MakeIntComma(cont.comment_count)})</b>}
                                            </div>
                                        </td>
                                        <td>{type}</td>
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
                        })}
                    </tbody>
                </table>
                : props.tdList && props.tdList.length === 0 && <div className="none_data">게시글이 없습니다.</div>
            }
        </div>
    );
};

export default TableWrap;