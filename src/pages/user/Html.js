import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import { pageNoChange, listPageData, detailPageBack } from "../../store/etcSlice";
import SearchInput from "../../components/component/SearchInput";
import ListBoard from "../../components/component/user/ListBoard";
import ListGallery from "../../components/component/user/ListGallery";
import Pagination from "../../components/component/Pagination";
import ConfirmPop from "../../components/popup/ConfirmPop";


const Html = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const board_list = enum_api_uri.board_list;
    const popup = useSelector((state)=>state.popup);
    const etc = useSelector((state)=>state.etc);
    const common = useSelector((state)=>state.common);
    const { menu_idx } = useParams();
    const [confirm, setConfirm] = useState(false);
    const [boardData, setBoardData] = useState({});


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);




    return(<>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Html;