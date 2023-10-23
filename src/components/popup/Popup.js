import { useSelector } from "react-redux";
import { createPortal } from "react-dom";


const Popup = () => {
    const popup = useSelector((state)=>state.popup);

    return createPortal(
        <>
            {/* 사진모아보기 팝업 */}
            {/* {popup.imgPop && <ImgPop />} */}

        </>,
        document.getElementById('modal-root')
    );
};

export default Popup;