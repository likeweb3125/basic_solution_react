import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as CF from "../../../config/function";
import { enum_api_uri } from "../../../config/enum";
import { notiPop, confirmPop } from "../../../store/popupSlice";
import ConfirmPop from "../../popup/ConfirmPop";

const NotiPop = (props) => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const alarm_list = enum_api_uri.alarm_list;
    const alarm = enum_api_uri.alarm;
    const [confirm, setConfirm] = useState(false);
    const [deltConfirm, setDeltConfirm] = useState(false);
    const [tab, setTab] = useState("all");
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
            setDeltConfirm(false);
        }
    },[popup.confirmPop]);


    //팝업닫기
    const closePopHandler = () => {
        dispatch(notiPop(false));
    };


    //알림 가져오기
    const getAlarmList = () => {
        axios.get(`${alarm_list.replace(":follow",tab)}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data.data;
                setTotal(data.totalCnt);
                setList(data.list);
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: err_msg,
                confirmPopBtn:1,
            }));
            setConfirm(true);
        });
    };


    useEffect(()=>{
        getAlarmList();
    },[tab]);


    //알림 전체읽기 처리
    const readHandler = () => {
        axios.get(`${alarm.replace(":follow","read")}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                //현재 list 배열에서 모든 a_read 값을 ["Y", "읽음"]로 변경
                const updatedList = list.map((item) => {
                    return {
                        ...item,
                        a_read: ["Y", "읽음"],
                    };
                });
                setList(updatedList);
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: err_msg,
                confirmPopBtn:1,
            }));
            setConfirm(true);
        });
    };


    //읽은알림 삭제버튼 클릭시
    const deltBtnClickHandler = () => {
        dispatch(confirmPop({
            confirmPop:true,
            confirmPopTit:'알림',
            confirmPopTxt:'읽은 알림을 모두 삭제하시겠습니까?',
            confirmPopBtn:2,
        }));
        setDeltConfirm(true);
    };


    //읽은알림 삭제하기
    const deltHandler = () => {
        axios.get(`${alarm.replace(":follow","delete")}`,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                getAlarmList();
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: err_msg,
                confirmPopBtn:1,
            }));
            setConfirm(true);
        });
    };

    return(<>
        <div className="pop_noti">
            <h5>알림</h5>
            <div className="pop_inner">
                <ul className="tab_noti">
                    <li className={tab == "all" ? "on" : ""}><button type="button" onClick={()=>setTab("all")}>전체</button></li>
                    <li className={tab == "board" ? "on" : ""}><button type="button" onClick={()=>setTab("board")}>게시글</button></li>
                    <li className={tab == "comment" ? "on" : ""}><button type="button" onClick={()=>setTab("comment")}>댓글</button></li>
                </ul>
                <div className="noti_box">
                    <div className="noti_util">
                        <span>알림이 총 <b>{CF.MakeIntComma(total)}</b>개가 있습니다.</span>     
                        {list.length > 0 &&                                  
                            <ul className="btn_wrap">
                                <li>
                                    <button type="button" onClick={readHandler}>전체 읽기</button>
                                </li>
                                <li>
                                    <button type="button" onClick={deltBtnClickHandler}>읽은 알림 삭제</button>
                                </li>
                            </ul>
                        }
                    </div>
                    {list.length > 0 ?
                        <ul className="list_noti">
                            {list.map((cont,i)=>{
                                const date = cont.reg_date.split(' ')[0];
                                return(
                                    <li key={i} className={cont.a_read[0] == "Y" ? "read" : ""}>
                                        <div className="cate">{cont.follow}</div>
                                        <div className="txt_wrap">
                                            <em className="ellipsis">{`[${cont.c_name}] `}{`‘${cont.title}‘`}{cont.follow == "게시글" ? " 새 글 작성" : " 댓글 작성"}</em>
                                            <strong>
                                                <b>{cont.m_name}</b>
                                                <span>{cont.content}</span>
                                            </strong>
                                            <i>{date}</i>
                                        </div>
                                        <button type="button" className="btn_noti_remove">알림 삭제</button>
                                    </li>
                                );
                            })}
                        </ul>
                        : <div className="none_data">알림이 없습니다.</div>
                    }
                </div>
            </div>
            <button type="button" className="btn_noti_close" onClick={closePopHandler}>알림팝업 닫기</button>
        </div>

        {/* 알림삭제 confirm팝업 */}
        {deltConfirm && <ConfirmPop onClickHandler={deltHandler} />}

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default NotiPop;