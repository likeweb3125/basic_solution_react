const MyStatBox = ({list}) => {
    return(<>
        <ul className="stat_box">
            <li>
                <strong>0</strong>
                <span>작성글</span>
            </li>
            <li>
                <strong>0</strong>
                <span>작성댓글</span>
            </li>
            <li>
                <strong>0</strong>
                <span>작성 문의글</span>
            </li>
        </ul>
    </>);
};

export default MyStatBox;