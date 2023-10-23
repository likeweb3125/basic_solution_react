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
                {list.map((val,i)=>{
                    return(
                        <option value={val} key={i}>{val}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectBox;