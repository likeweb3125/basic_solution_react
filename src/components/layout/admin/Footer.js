import f_admin_logo from "../../../images/f_admin_logo.png";

const Footer = () => {
    return(
        <footer id="footer" className="footer">
            <div className="footer_inner">
                <address>
                    <ul>
                        <li><h2>라이크웹</h2></li>
                        <li>
                            <span>대표이사</span>
                            홍길동
                        </li>
                        <li>
                            <span>사업자등록번호</span>
                            012-34-567890
                        </li>
                    </ul>
                    <ul>
                        <li>
                            서울 강남구 봉은사로55길 17 가남빌딩 5층
                        </li>
                        <li>
                            <span>Tel</span>
                            070-1234-5678
                        </li>
                        <li>
                            <span>Email</span>
                            info@mailmailamial.co.kr
                        </li>
                    </ul>
                </address>
                <h2 className="f_logo">
                    <img src={f_admin_logo} alt="로고" />
                </h2>
            </div>
        </footer>
    );
};

export default Footer;