const SearchInput = (props) => {
    return(
        <div className="search_input">
            <div className="input_box">
                <input 
                    type="text" 
                    placeholder={props.placeholder}
                    onChange={props.onChangeHandler}
                    value={props.value}
                />
            </div>
            <button type="button" className="btn_search" onClickHandler={props.onClickHandler}>검색하기</button>
        </div>
    );
};

export default SearchInput;