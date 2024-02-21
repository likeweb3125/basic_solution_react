import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmPop from "../../components/popup/ConfirmPop";


const Html = () => {
    const popup = useSelector((state)=>state.popup);
    const common = useSelector((state)=>state.common);
    const [confirm, setConfirm] = useState(false);
    const [content, setContent] = useState(null);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    useEffect(()=>{
        const cont = common.currentMenuData.content;
        setContent(cont);
    },[common.currentMenuData])




    return(<>
        <div className="page_user_board">
            <div dangerouslySetInnerHTML={{__html:content}}></div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Html;