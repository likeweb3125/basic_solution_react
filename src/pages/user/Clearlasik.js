import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import img_clearlasik1 from "../../images/user_images/img_clearlasik1.png";
import img_clearlasik1_tb from "../../images/user_images/img_clearlasik1_tb.png";
import img_clearlasik1_m from "../../images/user_images/img_clearlasik1_m.png";
import img_clearlasik2_1 from "../../images/user_images/img_clearlasik2_1.png";
import img_clearlasik2_circle from "../../images/user_images/img_clearlasik2_circle.png";
import img_clearlasik2_2 from "../../images/user_images/img_clearlasik2_2.png";
import img_clearlasik2_3 from "../../images/user_images/img_clearlasik2_3.png";
import img_clearlasik1_object from "../../images/user_images/img_clearlasik1_object.png";


const Clearlasik = () => {
    const contRef = useRef(null);
    const sect1Ref = useRef(null);
    const sect2Ref = useRef(null);
    const sect3Ref = useRef(null);
    const sect4Ref = useRef(null);
    const sect5Ref = useRef(null);
    const sect6Ref = useRef(null);
    const videoRef = useRef(null);
    const [btnTab, setBtnTab] = useState(null);
    

    //스크롤시 하단 탭 on
    const scrollTabOn = () => {
        const scroll = window.scrollY;
        const sect2 = sect2Ref.current.offsetTop;
        const sect3 = sect3Ref.current.offsetTop;
        const sect4 = sect4Ref.current.offsetTop;
        const sect5 = sect5Ref.current.offsetTop;
        const sect6 = sect6Ref.current.offsetTop;

        if(scroll >= sect2 && scroll < sect3){
            setBtnTab(1);
        }
        if(scroll >= sect3 && scroll < sect4){
            setBtnTab(2);
        }
        if(scroll >= sect4 && scroll < sect5){
            setBtnTab(3);
        }
        if(scroll >= sect5 && scroll < sect6){
            setBtnTab(4);
        }
        if(scroll < sect2 || scroll >= sect6){
            setBtnTab(null);
        }
    };

    //스크롤시 섹션마다 애니메이션
    useEffect(()=>{

        // 클리어라식 섹션2
        const clearSection2Fn = () => {
            const clearSection2 = contRef.current.querySelector('.clearlasik_section2');
            const clearSection2Con2 = clearSection2.querySelector('.con_inner2');
            const clearSection2Rect = clearSection2.getBoundingClientRect();
            const clearSection2Con2Rect = clearSection2Con2.getBoundingClientRect();
            const clearSection2Bottom = clearSection2Rect.bottom;
            const clearSection2Con2Height = clearSection2Con2Rect.height;
            const clearSection2Con2Top = clearSection2Con2Rect.top;
            const isOn = clearSection2Con2Top - (clearSection2Con2Height * 0.5) <= 0 && clearSection2Bottom - (document.documentElement.clientHeight * 1.2) < 0;
            clearSection2.classList.toggle('on', isOn);
        }

        // 클리어라식 섹션4
        const clearSection4 = contRef.current.querySelector('.clearlasik_section4');
        const clearScrollBlankWrap = clearSection4.querySelector('.scroll_blank_wrap');
        const clearScrollBlank = clearScrollBlankWrap.querySelectorAll('.scroll_blank_wrap > div');
        const clearMaskImgs = clearSection4.querySelectorAll('.mask_box .img');
        const clearCircleImgs = clearSection4.querySelectorAll('.circle_box .img');
        const clearTxtCons = clearSection4.querySelectorAll('.txt_con_wrap .txt_con');
        const clearSection4Fn = () => {
            const clearSection4Rect = clearSection4.getBoundingClientRect();
            const clearSection4Top = clearSection4Rect.top;
            const windowHeight = document.documentElement.clientHeight;
            clearSection4.classList.toggle('active', clearSection4Top - (windowHeight * 0.7) <= 0);
            clearScrollBlank.forEach((el, index) => {
                const elementRect = el.getBoundingClientRect();
                const isTop = elementRect.top - (windowHeight * 0.7) <= 0 && elementRect.bottom - (windowHeight * 0.7) > 0;
                [clearMaskImgs, clearCircleImgs, clearTxtCons].forEach(elements =>
                    elements[index].classList.toggle('on', isTop)
                );
            });
        }

        // 클리어라식 섹션5
        const clearSection5 = contRef.current.querySelector('.clearlasik_section5');
        const clearSection5Con = clearSection5.querySelectorAll('.con_inner');
        const clearSection5Fn = () => {
            clearSection5Con.forEach((el, index) => {
                const elementRect = el.getBoundingClientRect();
                if(elementRect.top - (document.documentElement.clientHeight * 0.7) <= 0) {
                    el.classList.add('on');
                }
            });
        }

        // 클리어라식 섹션6
        const clearSection6 = contRef.current.querySelector('.clearlasik_section6');
        const clearSection6Tit = clearSection6.querySelector('.section_tit');
        const clearSection6LinkWrap = clearSection6.querySelector('.link_wrap');
        const clearSection6Fn = () => {
            const clearSection6Rect = clearSection6.getBoundingClientRect();
            const clearSection6TitRect = clearSection6Tit.getBoundingClientRect();
            const clearSection6Top = clearSection6Rect.top;
            const clearSection6Height = clearSection6Rect.height;
            const clearSection6TitHeight = clearSection6TitRect.height;
            if(clearSection6Top <= 0) {
                if(clearSection6Rect.bottom - document.documentElement.clientHeight < 0) {
                    clearSection6Tit.style.transform = `translate3d(0, ${clearSection6Height.toFixed(0) - clearSection6TitHeight}px, 0)`;
                    clearSection6LinkWrap.style.transform = `translate3d(0, ${clearSection6Height.toFixed(0) - clearSection6TitHeight}px, 0)`;
                } else {
                    clearSection6Tit.style.transform = `translate3d(0, ${-clearSection6Top.toFixed(0)}px, 0)`;
                    clearSection6LinkWrap.style.transform = `translate3d(0, ${-clearSection6Top.toFixed(0)}px, 0)`;
                }
            } else {
                clearSection6Tit.style.transform = `translate3d(0, 0, 0)`;
                clearSection6LinkWrap.style.transform = `translate3d(0, 0, 0)`;
            }
        }

        const handleScroll = () => {
            clearSection2Fn();
            clearSection4Fn();
            clearSection5Fn();
            clearSection6Fn();
        };
      
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', scrollTabOn);
        handleScroll(); // Initial check
      
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', scrollTabOn);
        };
    },[]);


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


    //섹션4 수술과정 슬라이드---------------------------------------
    const [gifSwiper, setGifSwiper] = useState(null);
    const [gifTxtOn, setGifTxtOn] = useState(0);

    const initGifSwiper = (swiper) => {
        setGifSwiper(swiper);
    };

    //슬라이드 변경시
    const gifSlideChange = (idx) => {
        setGifTxtOn(idx);
    };



    return(<>
        <div className="page_user_clearlasik" ref={contRef}>

            {/* 서브 하단 탭 */}
            <div className="sub_tab_wrap">
                <ul className="sub_tab">
                    <li className={btnTab === 1 ? " on" : ""}>
                        <Link to="subSect1" className="btn_tab">클리어라식이란?</Link>
                    </li>
                    <li className={btnTab === 2 ? " on" : ""}>
                        <Link to="subSect2" className="btn_tab">FEMTO LDV Z8</Link>
                    </li>
                    <li className={btnTab === 3 ? " on" : ""}>
                        <Link to="subSect3" className="btn_tab">클리어라식 수술 과정</Link>
                    </li>
                    <li className={btnTab === 4 ? " on" : ""}>
                        <Link to="subSect4" className="btn_tab">클리어라식 특징</Link>
                    </li>
                </ul>
            </div>
            {/* //서브 하단 탭 */}

            <div className="top_section section_con" ref={sect1Ref}>
                <div className="top_img">
                    <div className="img_wrap">
                        <div className="pc_img">
                            <img src={img_clearlasik1} alt="배경이미지"/>
                        </div>
                        <div className="tb_img">
                            <img src={img_clearlasik1_tb} alt="배경이미지"/>
                        </div>
                        <div className="m_img">
                            <img src={img_clearlasik1_m} alt="배경이미지"/>
                        </div>
                    </div>
                </div>
                <div className="section_tit">
                    <em>Hello to a CLEAR vison</em>
                    <h3>
                        <span>
                            <i>세상을 클리어하게 바라보는</i>
                        </span>
                        <span>
                            <i>상상을 해보세요.</i>
                        </span>
                    </h3>
                </div>
                <div className="video_con">
                    <div className="video_wrap">
                        <div className="video">
                            <video ref={videoRef} src={require(`../../images/video/video_clearlasik.mp4`)} onEnded={videoEnded}></video>
                            <button type="button" className="btn_video_play" onClick={videoPlay}>비디오 재생</button>
                        </div>
                        <span>본 영상은 클리어라식 수술 영상입니다.</span>
                    </div>
                    <img src={img_clearlasik1_object} alt="이미지" className="object_image"/>
                </div>
            </div>
            <div className="sub_section clearlasik_section1 section_con" id="subSect1" ref={sect2Ref}>
                <div className="section_inner">
                    <div className="tit">
                        <strong>클리어는 <b>기존 교정술의 한계</b>를 극복합니다.</strong>
                        <p>FEMTO LDV Z8 장비로 레이저를 조사하여 렌티큘(각막조직 조각)을 만든 후, <br/>최소 절개창으로 제거하여 굴절이상을 교정하는 것을 말합니다.</p>
                        <span>시력 교정을 위한 새로운 최소 침습 수술을 진행합니다.</span>
                    </div>
                    <div className="box_wrap">
                        <div className="box_inner">
                            <div className="box box1">
                                <div className="inner_circle">
                                    <strong>라섹</strong>
                                </div>
                                <span>각막 상피를 제거하는 수술</span>
                            </div>
                            <div className="box box2">
                                <div className="inner_circle">
                                    <strong>라식</strong>
                                </div>
                                <span>각막 절편을 생성하는 수술</span>
                            </div>
                            <div className="box box3">
                                <div className="inner_circle">
                                    <strong>스마일라식</strong>
                                </div>
                                <span>각막 절편을 생성하지 않는 수술</span>
                            </div>
                        </div>
                        <div className="box box4">
                            <div className="inner_circle">
                                <strong>클리어라식<b>각막 절편을 생성하지 않는 최소 절개 및 안구 회선축을 고려한 수술</b></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub_section clearlasik_section2" id="subSect2" ref={sect3Ref}>
                <div className="section_inner">
                    <div className="con">
                        <div className="con_inner con_inner1">
                            <div className="section_tit">
                                <em>FEMTO LDV Z Models</em>
                                <h3>고객에게 안전하고 적합한 <br/>스위스 기술의 애플리케이션</h3>
                            </div>
                        </div>
                        <div className="con_inner con_inner2">
                            <div className="section_tit">
                                <em>
                                    한단계 진보된 인터페이스
                                    <span>
                                        <b>렌티큘 중심 위치 조정, <br/>절개창 위치 조절</b>로 <br/><b>개개인에 맞춘 라식술</b>
                                    </span>
                                </em>
                            </div>
                        </div>
                    </div>
                    <div className="img_fixed">
                        <div className="img img_center">
                            <img src={img_clearlasik2_1} alt="이미지"/>
                            <div className="circle_img">
                                <img src={img_clearlasik2_circle} alt="이미지"/>
                            </div>
                        </div>
                        <div className="img img_left">
                            <img src={img_clearlasik2_2} alt="이미지"/>
                        </div>
                        <div className="img img_right">
                            <img src={img_clearlasik2_3} alt="이미지"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub_section clearlasik_section3 section_con" id="subSect3" ref={sect4Ref}>
                <div className="section_inner">
                    <div className="gif_slider_section">
                        <div className="section_tit">
                            <em>surgical procedure</em>
                            <h3>클리어라식 <br/>수술 과정</h3>
                        </div>
                        <div className="slide_util">
                            <div className="swiper-pagination"></div>
                            <div className="swiper-button-prev btn_arrow"></div>
                            <div className="swiper-button-next btn_arrow"></div>
                        </div>
                    </div>
                    <div className="gif_slider_wrap">
                        <Swiper
                            className="gif_slider swiper"
                            modules={[Pagination, Navigation]}
                            slidesPerView={1.05}
                            spaceBetween={24}
                            speed={1000}
                            pagination= {
                                {
                                    el: '.gif_slider_section .swiper-pagination',
                                    type: 'custom',
                                    renderCustom: function (swiper, current, total) {
                                        const num = num => num < 10 ? `0${num}` : num;
                                        return `<span class="current">${num(current)}</span><span class="total">${num(total)}</span>`;
                                    }
                                }
                            }
                            navigation={{nextEl: ".gif_slider_section .swiper-button-next",prevEl: ".gif_slider_section .swiper-button-prev"}}
                            onSwiper={initGifSwiper}
                            onSlideChange={(e)=>{
                                const idx = e.realIndex;
                                gifSlideChange(idx);
                            }}
                            breakpoints={
                                {
                                    1418:{slidesPerView:1,spaceBetween:60}, //width >= 1418
                                    767:{slidesPerView:1.2,spaceBetween:40},  //width >= 767
                                }
                            }
                        >
                            <SwiperSlide>
                                <img src={require(`../../images/user_images/img_how1.gif`)} alt="이미지"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={require(`../../images/user_images/img_how2.gif`)} alt="이미지"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={require(`../../images/user_images/img_how3.gif`)} alt="이미지"/>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="slide_txt">
                        <div className={`txt${gifTxtOn === 0 ? " on" : ""}`}>
                            <strong>렌티큘 생성</strong>
                            <p>작은 원반 형태의 각막 조직 조각인 렌티큘을 만들고 <br/>각막을 미세하게 절개합니다.</p>
                        </div>
                        <div className={`txt${gifTxtOn === 1 ? " on" : ""}`}>
                            <strong>렌티큘 추출</strong>
                            <p>절개된 부분을 통해 각막의 자극을 최소화 하여 <br/>렌티큘을 제거합니다.</p>
                        </div>
                        <div className={`txt${gifTxtOn === 2 ? " on" : ""}`}>
                            <strong>교정시력</strong>
                            <p>렌티큘을 제거함으로써 각막의 형태에 변화를 주어 <br/>굴절 이상을 교정합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub_section clearlasik_section4 section_con" id="subSect4" ref={sect5Ref}>
                <div className="fixed_content">
                    <div className="section_inner">
                        <div className="section_tit">
                            <em>
                                <i>왜 결국 <b>클리어를</b> 선택할까요?</i>
                            </em>
                            <strong>클리어는 수술 시간이 짧으며 <br style={{"display":"block"}}/>환자에게 부담이 덜 합니다.</strong>
                        </div>
                        <div className="con">
                            <div className="img_slide_wrap">
                                <div className="mask_box">
                                    <div className="img on">
                                        <img src={require(`../../images/user_images/img_clearlasik4_1.png`)} alt="이미지"/>
                                    </div>
                                    <div className="img">
                                        <img src={require(`../../images/user_images/img_clearlasik4_2.png`)} alt="이미지"/>
                                    </div>
                                    <div className="img">
                                        <img src={require(`../../images/user_images/img_clearlasik4_3.png`)} alt="이미지"/>
                                    </div>
                                </div>
                                <div className="circle_box">
                                    <div className="img on">
                                        <img src={require(`../../images/user_images/img_clearlasik4_1_object.png`)} alt="이미지"/>
                                    </div>
                                    <div className="img">
                                        <img src={require(`../../images/user_images/img_clearlasik4_2_object.png`)} alt="이미지"/>
                                    </div>
                                    <div className="img">
                                        <img src={require(`../../images/user_images/img_clearlasik4_3_object.png`)} alt="이미지"/>
                                    </div>
                                </div>
                            </div>
                            <div className="txt_con_wrap">
                                <div className="txt_con on">
                                    <div className="txt">
                                        <strong>
                                            <span>클리어라식은</span>
                                        </strong>
                                        <div className="move_txt">
                                            <span>Low Energy</span>
                                        </div>
                                    </div>
                                    <p>
                                        Low Energy(낮은에너지로) 각막 열 손상 및 
                                        <br/>
                                        Bubble 발생 감소로 안구 건조증, 빛번짐 현상이 적습니다.
                                    </p>
                                </div>
                                <div className="txt_con">
                                    <div className="txt">
                                        <strong>
                                            <span>클리어라식은</span>
                                        </strong>
                                        <div className="move_txt">
                                            <span>No Tissue Bridges</span>
                                        </div>
                                    </div>
                                    <p>
                                        촘촘하고 매끄러운 레이저 조사로 레이저 Spot간의 빈공간이 없어, 
                                        <br/>
                                        lap Lifting 과정의 조직손상을 최소화 합니다.
                                    </p>
                                </div>
                                <div className="txt_con">
                                    <div className="txt">
                                        <strong>
                                            <span>클리어라식은</span>
                                        </strong>
                                        <div className="move_txt">
                                            <span>중심화옵션</span>
                                        </div>
                                    </div>
                                    <p>
                                        동공중심(pupil center), 주시등(fixation light), 
                                        <br/>
                                        각막표시 (corneal marking) 같은 중심화 옵션제공합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll_blank_wrap">
                    {/* img_slide_wrap 갯수만큼 */}
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="clearlasik_section5 section_con" ref={sect6Ref}>
                <div className="section_tit">
                    <em>
                        <i>고객의 눈에 적합한 디자인으로 <b>안정성과 정확성 UP!</b></i>
                    </em>
                    <span>세밀하고 눈에 딱 맞는 클리어라식만의 기술력으로 <br/>손상력은 적게, 정밀성은 높게 진행됩니다.</span>
                    <strong>정교하고 안정하고 빠른 회복력을 통해 시력교정이 가능합니다.</strong>
                </div>
                <div className="con">
                    <div className="con_inner con_inner1">
                        <div className="con_tit">
                            <div className="section_inner">
                                <strong>
                                    <b>Centration <br/>Option</b>
                                    <i>01 도킹시스템</i>
                                </strong>
                            </div>
                        </div>
                        <div className="img">
                            <img src={require(`../../images/user_images/img_clearlasik5_1.png`)} alt="이미지"/>
                            <img src={require(`../../images/user_images/img_clearlasik5_1_tb.png`)} alt="이미지" className="tb_img"/>
                        </div>
                        <div className="txt">
                            <div className="section_inner">
                                <p>
                                    렌즈 왜곡을 최소화, 인터페이스를 통해 중심적 설정이 가능하고 
                                    <br style={{"display":"block"}}/>
                                    고정압력이 높아 석션 로스 위험이 낮아 사고확률이 적으며, 
                                    <br style={{"display":"block"}}/>
                                    <br style={{"display":"block"}}/>
                                    절개창의 위치를 조정할 수 있어서 렌티큘의 중심에 가깝게 절개 할 수 있습니다
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="con_inner con_inner2">
                        <div className="con_tit">
                            <div className="section_inner">
                                <strong>
                                    <b>High <br/>resolution <br/>OCT</b>
                                    <i>02 고해상도 OCT</i>
                                </strong>
                            </div>
                        </div>
                        <div className="img">
                            <img src={require(`../../images/user_images/img_clearlasik5_2.png`)} alt="이미지"/>
                            <img src={require(`../../images/user_images/img_clearlasik5_2_tb.png`)} alt="이미지" className="tb_img"/>
                        </div>
                        <div className="txt">
                            <div className="section_inner">
                                <p>
                                    고해상도OCT이미지가 실시간으로 제공됨으로 
                                    <br/>
                                    동공 가장자리, 각막층 전체구조, 수정체와 홍채 전면을 감지하여 
                                    <br/>
                                    <br/>
                                    최적의 위치에서 각막 실질을 분리, 각막중심을 완벽하게 측정해 
                                    정확한 시력교정이 가능합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearlasik_section6 section_con">
                <div className="section_inner">
                    <div className="section_tit">
                        <em>Frequently Asked Questions</em>
                        <h3>
                            <span>
                                <i>클리어라식</i>
                            </span>
                            <span>
                                <i>이게 궁금해요!</i>
                            </span>
                        </h3>
                        <p>클리어라식의 진심의 알아주는 관련 병원만 전국에 31곳 이상 <br/>고객들이 가장 궁금해하는 점은 무엇일까요?</p>
                    </div>
                    <div className="con">
                        <div className="list_wrap">
                            <ul className="list_questions">
                                <li>
                                    <div className="card">
                                        <strong>어떤 사람이 클리어에 적합한가요?</strong>
                                    </div>
                                    <div className="hover">
                                        <strong>어떤 사람이 클리어에 적합한가요?</strong>
                                        <p>클리어 (CLEAR) 는 난시의 유무와 관계없이 근시를 교정하기 위해서 만들어졌습니다. 모든 사람의 눈은 서로 다르므로, 클리어 (CLEAR) 수술에 적합한지 아닌지를 판단 하기 위해서는 전문가의 정확한 진단이 필요합니다.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="card">
                                        <strong>수술시간은 얼마나 걸리나요?</strong>
                                    </div>
                                    <div className="hover">
                                        <strong>수술시간은 얼마나 걸리나요?</strong>
                                        <p>수술에는 약 15분 정도가 소요되며, 레이저 교정 자체는 35~40초 정도 밖에 걸리지 않습니다.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="card">
                                        <strong>더 질문이 있으신가요?</strong>
                                    </div>
                                    <div className="hover">
                                        <strong>더 질문이 있으신가요?</strong>
                                        <p>현재 방문하신 병원의 안과 전문의와 상의해 보시기 바랍니다.</p>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list_questions">
                                <li>
                                    <div className="card">
                                        <strong>안전한 수술인가요?</strong>
                                    </div>
                                    <div className="hover">
                                        <strong>안전한 수술인가요?</strong>
                                        <p>클리어 (CLEAR) 는 CE 마크를 획득하였으며, EU의 안전, 건강, 환경 보호 기준을 충족합니다. 클리어는 여느 시력 교정술과 마찬가지로 수술의 위험성은 낮은 편이며, 전문가의 상담을 받아보시길 권장드립니다.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="card">
                                        <strong>수술 후, 일상 생활로 복귀하는데 얼마나 걸리나요?</strong>
                                    </div>
                                    <div className="hover">
                                        <strong>수술 후, 일상 생활로 복귀하는데 얼마나 걸리나요?</strong>
                                        <p>회복 기간은 환자마다 차이가 있을 수 있습니다. 대부분의 경우, 술 후 1-2일이면 시력은 거의 좋아지고, 일주일 안에 안정됩니다. 보통은 며칠 안에 운전과 운동이 가능합니다.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="link_wrap">
                        <div className="link">
                            <a href="/hospital" className="btn_style3">
                                <span>병원 찾기</span>
                            </a>
                            <p>당신의 눈과 시력을 개선하는 클리어라식을 통해 <br/>가장 적합한 시력 교정 방법을 찾아보세요.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom_section">
                <a href="/ziemer">
                    <div className="txt">
                        <em>About</em>
                        <strong>Ziemer?</strong>
                    </div>
                </a>
            </div>
        </div>
    </>);
};

export default Clearlasik;
