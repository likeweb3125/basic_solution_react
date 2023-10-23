const TableWrap = (props) => {
    return(
        <div className={props.class}>
            <table>
                <colgroup>
                    {props.colgroup.map((cont,i)=>{
                        return(<col key={i} style={{width: cont}}/>);
                    })}
                </colgroup>
                <thead>
                    <tr>
                        {props.thList.map((cont,i)=>{
                            return(<th key={i}>{cont}</th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.tdList.map((cont,i)=>{
                        //공지사항일때
                        // if(props.type == "notice"){
                            return(
                                <tr key={i}>
                                    <td>
                                        <div className="chk_box2">
                                            <input type="checkbox" id={`check_${i}`} className="blind"/>
                                            <label htmlFor={`check_${i}`}>선택</label>
                                        </div>
                                    </td>
                                    <td>공지</td>
                                    <td>
                                        <div className="txt_left">
                                            <span>
                                                <a href="#">문의드립니다.</a>
                                            </span>
                                            <b>(1)</b>
                                        </div>
                                    </td>
                                    <td>일반</td>
                                    <td>
                                        <a href="#">김은비</a>
                                    </td>
                                    <td>
                                        <span className="txt_light">2018.10.10 10:20</span>
                                    </td>
                                    <td>
                                        {/* <button type="button" className="btn_type10 on">공지 설정</button> */}
                                        <button type="button" className="btn_type10 on">공지 해제</button>
                                    </td>
                                </tr>
                            );
                        // }
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableWrap;