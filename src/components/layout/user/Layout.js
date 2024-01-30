import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Layout = (props) => {
    const location = useLocation();

    
    useEffect(() => {
        const path = location.pathname;

    }, [location]);


    return(<>
        <div className="body_user">
            <div id="wrap">
                <Header />
                <main id="main" className="main sub_page">
                    <section className="user_section">
                        <div className="page_inner">{props.children}</div>
                    </section>
                </main>    
                <Footer />
            </div>
        </div>
    </>);
};

export default Layout;