import { useEffect, useState } from "react";


const SelectBox = (props) => {
    const [list, setList] = useState([]);

    useEffect(()=>{
        setList(props.list);
    },[props.list]);

    return(
        <div className={props.class}>
            <select 
                value={props.selected}
                onChange={props.onChangeHandler}
                name={props.name}
            >
                <option value="" hidden={props.selHidden}>선택</option>
                {list && list.map((val,i)=>{
                    return(
                        props.objectSel === "board_title" ? //게시판관리 - 게시글들 제목일때
                            <option value={val.c_name} key={i} data-category={val.category}>{val.c_name}</option>
                        :   <option value={val} key={i}>{val}{props.limitSel && "개씩"}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectBox;