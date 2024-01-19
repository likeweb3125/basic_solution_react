import { NumericFormat, PatternFormat } from "react-number-format";


const InputBox = (props) => {

    return(
        <div className="input_box">
            {props.countShow && <span className="char_cnt">{`${props.count}/${props.countMax}`}</span>}
            {props.numberOnly ? 
                <NumericFormat 
                    thousandSeparator="," 
                    decimalScale={0} 
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChangeHandler}
                    id={props.id}
                    maxLength={props.countMax}
                    className={props.className}
                    disabled={props.disabled}
                />
                :   props.phone ? 
                    <PatternFormat 
                        format="###-####-####"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChangeHandler}
                        id={props.id}
                        maxLength={props.countMax}
                        className={props.className}
                        disabled={props.disabled}
                    />
                :   <input type={props.type} 
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChangeHandler}
                        id={props.id}
                        maxLength={props.countMax}
                        className={props.className}
                        disabled={props.disabled}
                    />
            }
        </div>

    );
};

export default InputBox;