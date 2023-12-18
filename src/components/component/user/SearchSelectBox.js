import { useEffect, useState } from "react";


const SearchSelectBox = (props) => {
    const [list, setList] = useState([]);

    useEffect(()=>{
        setList(props.list);
    },[props.list]);

    return(
        <div className={props.class}>
            <div className="select">
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
        </div>
    );
};

export default SearchSelectBox;