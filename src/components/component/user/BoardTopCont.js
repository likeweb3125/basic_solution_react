import { Link } from "react-router-dom";

const BoardTopCont = (props) => {
    return(<>
        <div className="location_wrap">
            <ul className="location">
                <li>
                    <Link to="/" className="btn_home">홈</Link>
                </li>
                <li>매거진</li>
                <li>{props.boardTopData.loca}</li>
            </ul>
        </div>
        <div className="section_tit">
            {props.boardTopData.txt.map((txt,i)=>{
                return(
                    <span key={i}>
                        <i>{txt}</i>
                    </span>
                );
            })}
        </div>
        <div className="sub_visual">
            <div className="img">
                <img src={props.boardTopData.img} alt="배경이미지"/>
            </div>
            <span>Clear</span>
        </div>
    </>);
};

export default BoardTopCont;