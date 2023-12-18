import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { Pagination, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import img_ziemer2021_1 from "../../images/user_images/img_ziemer2021_1.png";
import img_ziemer2014_1 from "../../images/user_images/img_ziemer2014_1.png";
import img_ziemer2013_1 from "../../images/user_images/img_ziemer2013_1.png";
import img_ziemer2012_1 from "../../images/user_images/img_ziemer2012_1.png";
import img_ziemer2001_1 from "../../images/user_images/img_ziemer2001_1.png";
import img_ziemer1998_1 from "../../images/user_images/img_ziemer1998_1.png";


const Ziemer = () => {
    const contRef = useRef(null);
    const sect1Ref = useRef(null);
    const sect2Ref = useRef(null);
    const sect3Ref = useRef(null);
    const sect4Ref = useRef(null);
    const sect5Ref = useRef(null);
    const videoRef = useRef(null);
    const [btnTab, setBtnTab] = useState(null);


    //스크롤시 하단 탭 on
    const scrollTabOn = () => {
        const scroll = window.scrollY;
        const sect2 = sect2Ref.current.offsetTop;
        const sect3 = sect3Ref.current.offsetTop;
        const sect4 = sect4Ref.current.offsetTop;
        const sect5 = sect5Ref.current.offsetTop;

        if(scroll >= sect2 && scroll < sect3){
            setBtnTab(1);
        }
        if(scroll >= sect3 && scroll < sect4){
            setBtnTab(2);
        }
        if(scroll >= sect4 && scroll < sect5){
            setBtnTab(3);
        }
        if(scroll >= sect5){
            setBtnTab(4);
        }
        if(scroll < sect2){
            setBtnTab(null);
        }
    };


    //스크롤시 섹션마다 애니메이션
    useEffect(()=>{
        const header = document.getElementById('header');
        const windowHeight = document.documentElement.clientHeight;

        // 지머 top섹션
        const ziemerTopSection = contRef.current.querySelector('.top_section');
        const ziemerTopSectionFn = () => {
            const ziemerTopSectionRect = ziemerTopSection.getBoundingClientRect();
            header.classList.toggle('color_header', ziemerTopSectionRect.bottom <= 0);
        }

        // 지머 섹션2
        const ziemerSection2 = contRef.current.querySelector('.ziemer_section2');
        const ziemerSection2CenterBox = ziemerSection2.querySelector('.center_content .pagination_box');
        const ziemerSection2CenterBoxImage = ziemerSection2CenterBox.querySelector('.img');
        const ziemerSection2Con = ziemerSection2.querySelectorAll('.con_inner');

        // 숫자 10보다 작으면 0 추가하는 함수
        const numZeroFn = num => num < 10 ? `0${num}` : num;
        
        const ziemerSection2Fn = () => {
            const ziemerSection2Rect = ziemerSection2.getBoundingClientRect();
            let ratio = (ziemerSection2Rect.top + windowHeight) / windowHeight * 100;
            ratio = Math.min(100, Math.max(0, ratio));
            ziemerSection2CenterBox.style.width = `${ratio.toFixed(2)}%`;
            ziemerSection2CenterBox.style.height = `${ratio.toFixed(2)}%`;
            ziemerSection2CenterBoxImage.style.opacity = ratio.toFixed(0) / 100;
            ziemerSection2.classList.toggle('active', ratio === 0);
            ziemerSection2CenterBox.querySelector('.total').textContent = numZeroFn(ziemerSection2Con.length);
            ziemerSection2Con.forEach((section, index) => {
                const ziemerSection2ConImage = ziemerSection2Con[index].querySelector('.img');
                const currentNumber = index + 1;
                const sectionRect = section.getBoundingClientRect();
                const sectionTop = ziemerSection2Rect.top + (windowHeight * currentNumber);
                const sectionBottom = sectionTop + sectionRect.height;
                const isSectionInViewport = sectionTop <= 0 && sectionBottom > 0;
                section.classList.toggle('on', isSectionInViewport);
                if (isSectionInViewport) {
                    ziemerSection2CenterBox.querySelector('.current').textContent = numZeroFn(currentNumber);
                }
                let valueScrollY = (sectionTop / sectionRect.height) * 100;
                valueScrollY = Math.min(100, Math.max(0, valueScrollY));
                ziemerSection2ConImage.style.transform = `translateY(${valueScrollY.toFixed(2)}%)`;
            });
        }
        

        const handleScroll = () => {
            ziemerTopSectionFn();
            ziemerSection2Fn();
        };
      
        window.addEventListener('scroll', handleScroll);
        window.addEventListener("scroll", scrollTabOn);
        handleScroll(); // Initial check
      
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener("scroll", scrollTabOn);
        };
    },[]);


    //history 슬라이드------------------
    const [historySwiper, setHistorySwiper] = useState(null);

    const initHistorySwiper = (swiper) => {
        setHistorySwiper(swiper);
    };

    const [historyList, setHistoryList] = useState([
        {year:"2021",txt:"Launch FEMTO Z8 NEO",img:img_ziemer2021_1},
        {year:"2018",txt:"Ziemer’s 20TH anniversary"},
        {year:"2015",txt:"FEMTO LDV Z8 FDA clearance"},
        {year:"2014",txt:"Taiwan office"},
        {year:"2014",txt:"Launch FEMTO LDV Z8",img:img_ziemer2014_1},
        {year:"2013",txt:"Launch GALILEI G6",img:img_ziemer2013_1},
        {year:"2012",txt:"German subsidiary"},
        {year:"2012",txt:"Launch FEMTO LDV Z2 Z4 Z6",img:img_ziemer2012_1},
        {year:"2010",txt:"Launch GALILEI product line"},
        {year:"2008",txt:"Launch FEMTO LDV product line"},
        {year:"2007",txt:"US subsidiary"},
        {year:"2001",txt:"Launch AMDEUS Microkeratome",img:img_ziemer2001_1},
        {year:"1998",txt:"Company founded by Frank Ziemer",img:img_ziemer1998_1}
    ]);


    //비디오재생버튼 클릭시
    const videoPlay = () => {
        // video 요소가 있는지 확인 후 재생합니다.
        if (videoRef.current) {
            videoRef.current.parentNode.classList.add('video_playing');
            videoRef.current.play();
        }
    };
    
    //비디오 종료시
    const videoEnded = () => {
        // 비디오가 종료되면 처음으로 되감깁니다.
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };
    
    return(<>
        <div className="page_user_ziemer" ref={contRef}>

            {/* 서브 하단 탭 */}
            <div className="sub_tab_wrap">
                <ul className="sub_tab">
                    <li className={btnTab === 1 ? " on" : ""}>
                        <Link to="subSect1" className="btn_tab">지머 소개</Link>
                    </li>
                    <li className={btnTab === 2 ? " on" : ""}>
                        <Link to="subSect2" className="btn_tab">미션과 비전</Link>
                    </li>
                    <li className={btnTab === 3 ? " on" : ""}>
                        <Link to="subSect3" className="btn_tab">히스토리</Link>
                    </li>
                    <li className={btnTab === 4 ? " on" : ""}>
                        <Link to="subSect4" className="btn_tab">대표 영상</Link>
                    </li>
                </ul>
            </div>
            {/* //서브 하단 탭 */}

            <div className="top_section section_con">
                <div className="section_inner" ref={sect1Ref}>
                    <div className="top_tit">
                        <strong>
                            <span>Ziemer</span>
                            <i className="side_txt1">About Ziemer</i>
                            <i className="side_txt2">Eye care solutions</i>
                        </strong>
                    </div>
                    <div className="txt_wrap">
                        <div className="txt_box">
                            <span>세상을 클리어하게 바라보는 상상을 해보세요.</span>
                            <strong>
                                <span>
                                    <i>스위스 맞춤형 안과 치료,</i>
                                </span>
                                <em>
                                    <i>Ziemer Ophthalmic Systems AG</i>
                                </em>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub_section ziemer_section1 section_con" id="subSect1" ref={sect2Ref}>
                <div className="section_tit">
                    <em>About Ziemer</em>
                    <h3>
                        <span>지머는 스위스 본사를 둔,</span>
                        <strong>
                            <i>안과, 교정술, 그리고 치료에</i>
                        </strong>
                        <strong>
                            <i>특별한 초점을 맞춘 회사입니다.</i>
                        </strong>
                    </h3>
                </div>
                <div className="img_box">
                    <div className="img">
                        <img src={require(`../../images/user_images/bg_ziemer2.png`)} alt="이미지"/>
                    </div>
                    <div className="object_image">
                        <img src={require(`../../images/user_images/bg_ziemer2_object.png`)} alt="이미지"/>
                    </div>
                </div>
                <div className="txt_wrap">
                    <div className="section_inner">
                        <strong>지머는 <br/>새로운 비전 의료의 기준을 <br className="pc_br"/>제시합니다.</strong>
                        <div className="txt">
                            <p>지머는 스위스에 본사를 둔 안과 전문 기업으로 둔 안과 전문 기업으로 맞춤형 안과 치료를 위한 <br/>고급 레이저 및 진단 장치를 주력으로 하고 있습니다.</p>
                            <b>지머의 의료 전문가들이 검증한 의료 기술과 광범위한 역량을 최첨단 혁신으로 지원합니다.</b>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub_section ziemer_section2 section_con" id="subSect2" ref={sect3Ref}>
                <div className="center_content">
                    <div className="pagination_box">
                        <div className="img">
                            <img src={require(`../../images/user_images/img_ziemer2_1.png`)} alt="이미지"/>
                        </div>
                        <strong className="current">00</strong>
                        <span>/ <i className="total">00</i></span>
                    </div>
                </div>
                <div className="scroll_slider_wrap">
                    <div className="section_tit">
                        <em>Ziemer’s Mission</em>
                        <h3>
                            <span>
                                <i>클리어한 세상을 위해</i>
                            </span>
                            <span>
                                <i>지머와 함께합니다.</i>
                            </span>
                        </h3>
                    </div>
                    <div className="con">
                        <div className="con_inner con_inner1">
                            <div className="txt_box">
                                <div className="txt">
                                    <strong>why?</strong>
                                    <p>지머는 눈의 시력을 향상시킴으로써 <br/>수백만 명의 사람들의 삶의 질을 향상시키고자 합니다.</p>
                                </div>
                            </div>
                            <div className="img_wrap">
                                <div className="img">
                                    <img src={require(`../../images/user_images/img_ziemer2_2_1.png`)} alt="이미지"/>
                                </div>
                            </div>
                        </div>
                        <div className="con_inner con_inner2">
                            <div className="txt_box">
                                <div className="txt">
                                    <strong>how?</strong>
                                    <p>우리의 제품과 서비스는 의사와 환자 모두에게 이익이 되는 것에 초점을 맞춘 특별함을 가지고 있습니다. <br/>지머의 제품은 사용하기 쉽고, 스위스에서 고품질로 제조되며, 현대적인 디자인을 선보이고 있습니다.</p>
                                </div>
                            </div>
                            <div className="img_wrap">
                                <div className="img">
                                    <img src={require(`../../images/user_images/img_ziemer2_2_2.png`)} alt="이미지"/>
                                </div>
                            </div>
                        </div>
                        <div className="con_inner con_inner3">
                            <div className="txt_box">
                                <div className="txt">
                                    <strong>what?</strong>
                                    <p>이를 위해 당사는 진단 장비, 고체 절제 레이저, 펨토초 레이저 및 멸균 시술 팩을 개발 및 제조하고 있으며, 고객에게 상응하는 소프트웨어 솔루션, 서비스 및 교육을 제공하여 의사와 외과의사가 환자를 최선의 방법으로 치료할 수 있도록 지원하고 있습니다.</p>
                                </div>
                            </div>
                            <div className="img_wrap">
                                <div className="img">
                                    <img src={require(`../../images/user_images/img_ziemer2_2_3.png`)} alt="이미지"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sub_section ziemer_section3 section_con" id="subSect3" ref={sect4Ref}>
                <div className="section_inner">
                    <div className="section_tit">
                        <em>Our History</em>
                        <h3>
                            <span>
                                <i>지속적인 성장을 실현하며</i>
                            </span>
                            <span>
                                <i>글로벌 기업으로 성장해 나갑니다.</i>
                            </span>
                        </h3>
                    </div>
                    <div className="ziemer_slider_wrap">
                        <Swiper
                            className="ziemer_slider swiper"
                            modules={[Pagination, Navigation, Scrollbar]}
                            observer={true}
                            observeParents={true}
                            slidesPerView={1}
                            spaceBetween={40}
                            centeredSlides={true}
                            speed={600}
                            pagination= {
                                {
                                    el: '.ziemer_slider_wrap .swiper-pagination',
                                    type: 'custom',
                                    renderCustom: function (swiper, current, total) {
                                        const num = num => num < 10 ? `0${num}` : num;
                                        return `<span class="current">${num(current)}</span><span class="total">${num(total)}</span>`;
                                    }
                                }
                            }
                            navigation={{nextEl: ".ziemer_slider_wrap .swiper-button-next",prevEl: ".ziemer_slider_wrap .swiper-button-prev"}}
                            scrollbar={
                                {
                                    el: '.ziemer_slider_wrap .swiper-scrollbar',
                                    draggable: true,
                                }
                            }
                            onSwiper={initHistorySwiper}
                            onSlideChange={(e)=>{
                                const idx = e.realIndex;
                                // gifSlideChange(idx);
                            }}
                        >
                            {historyList.map((cont,i)=>{
                                return(
                                    <SwiperSlide key={i}>
                                        <div className="txt">
                                            <b>{cont.year}</b>
                                            <span>{cont.txt}</span>
                                        </div>
                                        {cont.img && <img src={cont.img} alt="이미지"/>}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <div className="swiper-scrollbar"></div>
                        <div className="slide_util">
                            <div className="swiper-pagination"></div>
                            <div className="swiper-button-prev btn_arrow"></div>
                            <div className="swiper-button-next btn_arrow"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sub_section ziemer_section4 section_con" id="subSect4" ref={sect5Ref}>
                <div className="section_tit">
                    <em>
                        <i><b>지머의 이정표</b>를 따라오세요.</i>
                    </em>
                    <span>고객과 함께 나아가는 지머사의 이정표를 소개합니다.</span>
                </div>
                <div className="video_con">
                    <div className="video_wrap">
                        <div className="video">
                            <video ref={videoRef} src={require(`../../images/video/video_ziemer.mp4`)} onEnded={videoEnded}></video>
                            <button type="button" className="btn_video_play" onClick={videoPlay}>비디오 재생</button>
                        </div>
                        <span>본 영상은 클리어라식 수술 영상입니다.</span>
                    </div>
                </div>
            </div>

            <div className="bottom_section">
                <a href="/clearlasik">
                    <div className="txt">
                        <em>About</em>
                        <strong>Clear?</strong>
                    </div>
                </a>
            </div>
        </div>
    </>);
};

export default Ziemer;
