import { useEffect, useState } from "react";


const InputBox = (props) => {


    return(
        <div className="input_box">
            {props.countShow && <span className="char_cnt">{`${props.count}/${props.countMax}`}</span>}
            <input type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChangeHandler}
                id={props.id}
                maxLength={props.countMax}
            />
        </div>

    );
};

export default InputBox;