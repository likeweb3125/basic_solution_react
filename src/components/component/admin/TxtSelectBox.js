import { useEffect, useState } from "react";


const TxtSelectBox = (props) => {
    const [list, setList] = useState([]);

    useEffect(()=>{
        setList(props.list);
    },[props.list]);


    return(
        <div className={props.class}>
            <div className={`txt_select${props.hiddenTxt && !props.selected ? ' none' : ''}`}>
                {props.limitSel ?
                    <span>{props.selected ? props.selected+"개씩" : "선택"}</span>
                    :<span>
                        {props.objectSel === "level_list" ? props.selected ? props.selected : '전체'
                            :props.selected ? props.selected : props.hiddenTxt ? props.hiddenTxt : "선택"
                        }
                    </span>
                }
                {props.objectSel === "level_list" && !props.allLevel ? //회원등급 리스트일때 (회원권한 설정할때 사용)
                    props.selectedLevel && (<em>{"lv."+props.selectedLevel}</em>)
                :props.objectSel === "level_list" && props.allLevel && (<em>{"lv."+props.selectedLevel}</em>) //회원등급 리스트일때 (회원등급변경할때 사용)
                }
            </div>
            <select 
                value={props.selected}
                onChange={props.onChangeHandler}
                name={props.name}
            >
                <option value="" hidden={props.selHidden}>{props.hiddenTxt ? props.hiddenTxt : "선택"}</option>
                {list && list.map((val,i)=>{
                    return(
                        props.objectSel === "board_title" ? //게시판관리 - 게시글들 제목일때
                            <option value={val.c_name} key={i} data-category={val.category}>{val.c_name}</option>
                        :   props.objectSel === "level_list" && !props.allLevel ? //회원등급 리스트일때 (회원권한 설정할때 사용)
                            <option value={val.l_name} key={i} data-level={val.l_level}>
                                {val.l_level}{val.l_level ? ' 등급' : '전체'}{val.l_level != 9 && val.l_level ? ' 이상' : ''}
                            </option>
                        :   props.objectSel === "level_list" && props.allLevel ? //회원등급 리스트일때 (회원등급변경할때 사용)
                            <option value={val.l_name} key={i} data-level={val.l_level}>
                                {val.l_name}
                            </option>
                        :   
                            <option value={val} key={i}>{val}{props.limitSel && "개씩"}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default TxtSelectBox;