const SearchInput = (props) => {
    return(
        <div className="search_input">
            <input 
                type="text" 
                placeholder={props.placeholder}
                onChange={props.onChangeHandler}
                value={props.value}
                onKeyDown={(e)=>{
                    if(e.key === "Enter") {
                        e.preventDefault();
                        props.onSearchHandler();
                    }
                }}
            />
            <button type="button" className="btn_map_search" onClick={props.onSearchHandler}>검색하기</button>
        </div>
    );
};

export default SearchInput;