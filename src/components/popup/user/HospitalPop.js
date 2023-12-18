import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hospitalPop } from "../../../store/popupSlice";


const HospitalPop = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const [mapData, setMapData] = useState({
        key: popup.hospitalPopData.mapKey,
        timestamp: popup.hospitalPopData.mapTimestamp,
        mapHeight: "300"
    });


    //팝업닫기
    const closePopHandler = () => {
        dispatch(hospitalPop({hospitalPop:false,hospitalPopData:null}));
    };


    //카카오지도
    useEffect(() => {
        new window.daum.roughmap.Lander(mapData).render();
    }, [mapData]);


    return(<>
        <div className="pop_user_display pop_hospital">
            <div className="dimm"></div>
            <div className="popup_wrap">
                <div className="popup">
                    <div className="pop_tit">
                        <h3>{popup.hospitalPopData.name}</h3>
                    </div>
                    <div className="pop_con">
                        <ul className="list_info">
                            <li className="address">
                                <b>위치</b>
                                <span>{popup.hospitalPopData.address}</span>
                            </li>
                            <li className="call">
                                <b>연락처</b>
                                <span>{popup.hospitalPopData.tel}</span>
                            </li>
                            <li className="site">
                                <b>홈페이지</b>
                                <span>
                                    <a href={popup.hospitalPopData.link} target="_blank" rel="noreferrer">바로가기</a>
                                </span>
                            </li>
                        </ul>
                        <div className="map_area">
                            <div id={`daumRoughmapContainer${popup.hospitalPopData.mapTimestamp}`} className="root_daum_roughmap root_daum_roughmap_landing" style={{ width: '100%' }}></div>
                        </div>
                        <div className="pop_btn_wrap">
                            <div className="btn_box">
                                <button type="button" className="btn_type4" onClick={closePopHandler}>확인</button>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn_pop_close" onClick={closePopHandler}>팝업닫기</button>
                </div>
            </div>
        </div>
    </>);
};

export default HospitalPop;