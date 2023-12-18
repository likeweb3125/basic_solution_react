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
                required={props.required}
            >
                <option value="" hidden={props.selHidden}>선택</option>
                {list && list.map((val,i)=>{
                    return(
                        <option value={val} key={i}>{val}{props.limitSel && "개씩"}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectBox;