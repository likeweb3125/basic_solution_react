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
                        props.objectSel ? //셀렉트박스 값 리스트가 객체일때
                            <option value={val.c_name} key={i}>{val.c_name}</option>
                        :   <option value={val} key={i}>{val}{props.limitSel && "개씩"}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectBox;