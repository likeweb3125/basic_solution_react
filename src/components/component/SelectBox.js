import { useEffect, useState } from "react";


const SelectBox = (props) => {
    const [list, setList] = useState([]);

    useEffect(()=>{
        setList(props.list);
    },[props.list]);

    return(
        <div className={props.className}>
            <select 
                value={props.selected}
                onChange={props.onChangeHandler}
                name={props.name}
                required={props.required}
            >
                <option value="" hidden={props.selHidden}>{props.hiddenTxt ? props.hiddenTxt : "선택"}</option>
                {list && list.map((val,i)=>{
                    return(
                        props.objectSel === "board_title" ? //게시판관리 - 게시글들 제목일때
                            <option value={val.c_name} key={i} data-category={val.category}>{val.c_name}</option>
                        :   props.objectSel === "board_group" ? <option value={val.g_name} key={i} data-id={val.id}>{val.g_name}</option>       //분류사용하는 게시판 분류리스트일때
                        :   props.objectSel === "level" ? <option value={val.l_name} key={i} data-level={val.l_level}>{val.l_name}</option>     //회원등급리스트 일때
                        :   props.objectSel === "lang" ? <option value={val.site_lang} key={i}>{val.site_lang_hangul}</option>                  //사이트 언어리스트 일때
                        :   <option value={val} key={i}>{val}{props.limitSel}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectBox;