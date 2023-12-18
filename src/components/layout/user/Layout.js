import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import BoardTopCont from "../../component/user/BoardTopCont";
import Footer from "./Footer";


const Layout = (props) => {
    const location = useLocation();
    const innerRef= useRef(null);

    
    useEffect(() => {
        const path = location.pathname;

        //지머 페이지일때 page_inner 스타일추가
        if(path == "/ziemer"){
            innerRef.current.style.paddingTop = 0;
        }

        //서브페이지일때 스크롤시 해당 section_con 에 on 추가
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const subSection = document.querySelectorAll('.sub_page .section_con');
    
            subSection.forEach((el, index) => {
                const subSectionTop = el.getBoundingClientRect().top;
                if (subSectionTop - windowHeight * 0.7 <= 0) {
                    el.classList.add('on');
                }
            });
        };

        handleScroll();
    
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [location]);


    return(<>
        <div className="body_user">
            <div id="wrap">
                <Header main={props.main} />
                {props.main ? //메인페이지일때
                        <>{props.children}</>
                    :   <>
                            <main id="main" className="main sub_page">
                                <section className="user_section">
                                    {props.board ? //게시판페이지일때
                                        <div className="page_inner" ref={innerRef}>
                                            <div className="page_user_magazine page_user_board">
                                                <BoardTopCont boardTopData={props.boardTopData} />
                                                <div className="section_wrap">
                                                    <div className="section_inner">
                                                        <div className="board_section">{props.children}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    :   <div className="page_inner" ref={innerRef}>{props.children}</div>
                                    }
                                </section>
                            </main>    
                            <Footer />
                        </>
                }
            </div>
        </div>
    </>);
};

export default Layout;