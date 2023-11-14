import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import AdminPoilicyPop from "./admin/PolicyPop";
import AdminCategoryPop from "./admin/CategoryPop";
import AdminBoardGroupPop from "./admin/BoardGroupPop";
import AdminPopupPop from "./admin/PopupPop";



const Popup = () => {
    const popup = useSelector((state)=>state.popup);

    return createPortal(
        <>
            {/* 관리자 --------------------------------------*/}
            {/* 운영정책 상세 팝업 */}
            {popup.adminPolicyPop && <AdminPoilicyPop />}

            {/* 하위카테고리 팝업 */}
            {popup.adminCategoryPop && <AdminCategoryPop />}

            {/* 게시판분류 팝업 */}
            {popup.adminBoardGroupPop && <AdminBoardGroupPop />}

            {/* 팝업관리 팝업 */}
            {popup.adminPopupPop && <AdminPopupPop />}

        </>,
        document.getElementById('modal-root')
    );
};

export default Popup;