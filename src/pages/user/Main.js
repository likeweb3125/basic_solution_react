import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Scrollbar } from "smooth-scrollbar-react";
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import util from "../../config/util";
import { confirmPop } from "../../store/popupSlice";
import Footer from "../../components/layout/user/Footer";
import ConfirmPop from "../../components/popup/ConfirmPop";
import UserPop from "../../components/popup/user/UserPop";
import main_visual01 from "../../images/user_images/main_visual01.png";
import main_visual01_tb from "../../images/user_images/main_visual01_tb.png";
import main_visual01_m from "../../images/user_images/main_visual01_m.png";
import main_visual02 from "../../images/user_images/main_visual02.png";
import main_visual02_tb from "../../images/user_images/main_visual02_tb.png";
import main_visual02_m from "../../images/user_images/main_visual02_m.png";
import main_visual03 from "../../images/user_images/main_visual03.png";
import main_visual03_tb from "../../images/user_images/main_visual03_tb.png";
import main_visual03_m from "../../images/user_images/main_visual03_m.png";
import img_object1 from "../../images/user_images/img_object1.png";
import img_object1_tb from "../../images/user_images/img_object1_tb.png";
import img_object1_m from "../../images/user_images/img_object1_m.png";
import img_object2 from "../../images/user_images/img_object2.png";
import img_object2_tb from "../../images/user_images/img_object2_tb.png";
import img_object2_m from "../../images/user_images/img_object2_m.png";
import img_object3 from "../../images/user_images/img_object3.png";
import img_object3_tb from "../../images/user_images/img_object3_tb.png";
import img_object3_m from "../../images/user_images/img_object3_m.png";
import img_main2_1 from "../../images/user_images/img_main2_1.png";
import img_main2_1_tb from "../../images/user_images/img_main2_1_tb.png";
import img_main2_1_m from "../../images/user_images/img_main2_1_m.png";
import img_main2_2 from "../../images/user_images/img_main2_2.png";
import img_main2_2_tb from "../../images/user_images/img_main2_2_tb.png";
import img_main2_2_m from "../../images/user_images/img_main2_2_m.png";
import img_main2_3 from "../../images/user_images/img_main2_3.png";
import img_main2_3_tb from "../../images/user_images/img_main2_3_tb.png";
import img_main2_3_m from "../../images/user_images/img_main2_3_m.png";
import img_main3 from "../../images/user_images/img_main3.png";
import prd_card1 from "../../images/user_images/prd_card1.png";
import prd_card2 from "../../images/user_images/prd_card2.png";
import prd_card3 from "../../images/user_images/prd_card3.png";
import img_how1 from "../../images/user_images/img_how1.gif";
import img_how2 from "../../images/user_images/img_how2.gif";
import img_how3 from "../../images/user_images/img_how3.gif";
import img_with from "../../images/user_images/img_with.png";


const Main = (props) => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const api_uri = enum_api_uri.api_uri;
    const board_list = enum_api_uri.board_list;
    const auth_popup_list = enum_api_uri.auth_popup_list;
    const [confirm, setConfirm] = useState(false);
    const scrollbarRef = useRef(null);
    const sect1Ref = useRef(null);
    const sect2Ref = useRef(null);
    const sect3Ref = useRef(null);
    const sect4Ref = useRef(null);
    const sect5Ref = useRef(null);
    const sect6Ref = useRef(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const autoplayDuration = 5000;
    const [mainSliderTxtOn, setMainSliderTxtOn] = useState(null);
    const [progressPaused, setProgressPaused] =  useState(false);
    const [howSwiper, setHowSwiper] = useState(null);
    const [howSliderNaviOn, setHowSliderNaviOn] = useState(0);
    const [newsSwiper, setNewsSwiper] = useState(null);
    const [newsList, setNewsList] = useState([]);
    const [popupList, setPopupList] = useState([]);
    const [popupType, setPopupType] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //화면사이즈 변경될때 width 체크---------
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    },[]);


    // 화면사이즈에 따라 popupType 변경
    useEffect(() => {
        if(windowWidth >= 1000){
            setPopupType("P");
        }else{
            setPopupType("M");
        }
    }, [windowWidth]);


    useEffect(() => {
        const scrollbar = scrollbarRef.current;

        //스크롤시 애니메이션
        if (scrollbar) {
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            const innerSection = document.querySelector('.inner_section_wrap');
            const mainSection2 = document.querySelector('.main_section2');
            const mainSection3 = document.querySelector('.main_section3');
            const mainSection4 = document.querySelector('.main_section4');
            const mainSection5 = document.querySelector('.main_section5');
            const mainSection6 = document.querySelector('.main_section6');
            const mainSection6Con = mainSection6.querySelector('.section_con');
            const mainSection2Bg = mainSection2.querySelector('.bg');
            const mainSection2Object = mainSection2.querySelector('.object_image_wrap');
            const innerSectionItem = innerSection.querySelectorAll('.inner_section');
            const mainSection3Item = mainSection3.querySelectorAll('.scroll_content .con');
            const mainSection3Fixed = mainSection3.querySelector('.fixed_content');
            const mainSection3txt = mainSection3Fixed.querySelectorAll('.txt_con');
            const mainSection2BgItem = mainSection2Bg.querySelectorAll('.bg_item');
            const mainSection2ObjectItem = mainSection2Object.querySelectorAll('.object_image');
            const mainNavigation = document.querySelector('.main_navigation');
            const mainSection = document.querySelectorAll('.main_section');
            const mainNavigationLink = mainNavigation.querySelectorAll('.main_section_navigation li a');
            const howSldierNavi = document.querySelector('.list_how_slider_navi');
            const howSliderButton = howSldierNavi.querySelectorAll('li');   
            const howSldierContent = document.querySelector('.how_slider_con');
            const howSliderImage = howSldierContent.querySelectorAll('.slide_img');
            const main6PinTit = mainSection6.querySelector('.pin_tit');
            const main6Text = mainSection6Con.querySelector('.txt_wrap');

            scrollbar.addListener((status) => {
                const offsetY = status.offset.y;
                const windowHeight = window.innerHeight;
                const innerSectionTop = innerSection.getBoundingClientRect().top;
                const innerSectionBottom = innerSection.getBoundingClientRect().bottom;
                const footerTop = footer.getBoundingClientRect().top;
                const mainSection3Top = mainSection3.getBoundingClientRect().top;
                const mainSection3Bottom = mainSection3.getBoundingClientRect().bottom;
                const mainSection3Height = mainSection3.getBoundingClientRect().height;
                const mainSection4Top = mainSection4.getBoundingClientRect().top;
                const mainSection5Top = mainSection5.getBoundingClientRect().top;
                const mainSection6Top = mainSection6.getBoundingClientRect().top;
                const mainSection6Height = mainSection6.getBoundingClientRect().height;

                // 헤더 관련 조건
                if(offsetY - windowHeight > 0) {
                    if (innerSectionTop <= 0) {
                        if (innerSectionBottom > 0) {
                            // console.log('3');
                            header.classList.remove('color_header');
                            mainNavigation.classList.remove('color_navigation');
                        } else {
                            if(mainSection6Top <= 0) {
                                header.classList.remove('color_header');
                                mainNavigation.classList.remove('color_navigation');
                            } else {
                                // console.log('4');
                                header.classList.add('color_header');
                                mainNavigation.classList.add('color_navigation');
                            }
                        }
                    } else {
                        // console.log('2');
                        header.classList.add('color_header');
                        mainNavigation.classList.add('color_navigation');
                    }
                } else {
                    // console.log('1');
                    header.classList.remove('color_header');
                    mainNavigation.classList.remove('color_navigation');
                }

                // 메인 네비게이션 위치
                if(offsetY > 0) {
                    if(footerTop - windowHeight < 0) {
                        mainNavigation.style.transform = `translate(0, ${offsetY - (windowHeight - footerTop)}px)`;
                    } else {
                        mainNavigation.style.transform = `translate(0, ${offsetY}px)`;
                    }
                } else {
                    mainNavigation.style.transform = 'translate(0, 0)';
                }

                // 메인 네비게이션 active
                mainSection.forEach((section, index) => {
                    const mainCurrentTop = section.getBoundingClientRect().top;
                    if (mainCurrentTop < windowHeight / 2 && mainCurrentTop > -section.clientHeight + windowHeight / 2) {
                        mainNavigation.querySelectorAll('li').forEach((navItem, navIndex) => {
                            if (index === navIndex) {
                                navItem.classList.add('active');
                                if(index === 0) {
                                    mainSection2.classList.remove('on');
                                } else {
                                    mainSection2.classList.add('on');
                                }
                            } else {
                                navItem.classList.remove('active');
                            }
                        });
                    }
                });

                // 메인섹션2 애니메이션
                const main2toggleClass = (elements) => {
                    const i = Math.max(0, Math.min(innerSectionItem.length - 1, Math.floor((-innerSectionTop + windowHeight / 3) / windowHeight)));
                    elements.forEach((item, itemIndex) => {
                        itemIndex === i ? item.classList.add('on') : item.classList.remove('on');
                    });
                };
                main2toggleClass(mainSection2BgItem);
                main2toggleClass(innerSectionItem);
                main2toggleClass(mainSection2ObjectItem);
            
                if (innerSectionTop <= 0) {
                    if (innerSectionBottom > 0) {
                        mainSection2Bg.style.transform = `translate(-50%, ${-innerSectionTop}px)`;
                        mainSection2Object.style.transform = `translate(-50%, ${-innerSectionTop}px)`;
                        innerSection.style.width = '100%';
                        mainSection2Bg.classList.add('on');
                        mainSection2Object.classList.add('on');
                    } else {
                        mainSection2Bg.style.transform = 'translate(-50%, 0)';
                        mainSection2Object.style.transform = 'translate(-50%, 0)';
                        mainSection2Bg.classList.remove('on');
                        mainSection2Object.classList.remove('on');
                    }
                } else {
                    let ratio = 100 - (innerSectionTop / windowHeight * 20);
                    ratio = Math.min(100, Math.max(85, ratio));
                    innerSection.style.width = `${ratio}%`;
                    mainSection2Bg.classList.remove('on');
                    mainSection2Bg.style.transform = 'translate(-50%, 0)';
                    mainSection2Object.classList.remove('on');
                    mainSection2Object.style.transform = 'translate(-50%, 0)';
                }

                // 메인섹션3
                mainSection3Item.forEach((el, index) => {
                    const elTop = el.getBoundingClientRect().top;
                    const elHeight = el.getBoundingClientRect().height;
                    if (elTop - (windowHeight / 2) <= 0 && elTop + elHeight - (windowHeight / 2) > 0) {
                        el.classList.add('on');
                        mainSection3txt[index].classList.add('on');
                        if(index !== 0) {
                            mainSection3Fixed.classList.add('active');
                        } else {
                            mainSection3Fixed.classList.remove('active');
                        }
                    } else {
                        el.classList.remove('on');
                        mainSection3txt[index].classList.remove('on');
                    }
                });

                if(mainSection3Top <= 0) {
                    if(mainSection3Bottom - windowHeight > 0) {
                        mainSection3Fixed.classList.add('on');
                        mainSection3.querySelector('.fixed_content').style.transform = `translate(0, ${-mainSection3Top}px)`;
                    } else {
                        mainSection3Fixed.classList.remove('on');
                        mainSection3.querySelector('.fixed_content').style.transform = `translate(0, ${(mainSection3Height - windowHeight).toFixed(0)}px)`;
                    }
                } else {
                    mainSection3Fixed.classList.remove('on');
                    mainSection3.querySelector('.fixed_content').style.transform = `translate(0, 0)`;
                }

                // 메인섹션4 on
                if(mainSection4Top - (windowHeight / 2) <= 0) {
                    mainSection4.classList.add('on');
                }

                // 메인섹션5 on
                if(mainSection5Top - (windowHeight / 3) <= 0) {
                    mainSection5.classList.add('on');
                }

                // 메인섹션6 on
                if(mainSection6Top - (windowHeight / 3) <= 0) {
                    mainSection6.classList.add('on');
                    if(mainSection6Top <= 1) {
                        main6PinTit.classList.add('on');
                        const distanceInPercentage = Math.min(100, Math.max(0, -((mainSection6Top * 2) / mainSection6Height) * 100));
                        const distanceInPercentageX = Math.min(100, 100 - distanceInPercentage).toFixed(2);
                        const distanceInPercentageOpacity = (distanceInPercentage / 100).toFixed(1);
                        if(-mainSection6Top - mainSection6Height + windowHeight <= 0) {
                            mainSection6Con.querySelector('h3 span').style.transform = `translateX(-${distanceInPercentageX}%)`;
                            mainSection6Con.querySelector('h4 span').style.transform = `translateX(${distanceInPercentageX}%)`;
                            mainSection6Con.querySelector('h3 span').style.opacity = distanceInPercentageOpacity;
                            mainSection6Con.querySelector('h4 span').style.opacity = distanceInPercentageOpacity;
                            mainSection6Con.style.transform = `translate(0, ${-mainSection6Top.toFixed(0)}px)`;
                            mainSection6Con.style.clipPath = `circle(${distanceInPercentage.toFixed(1) * 1.5}vw)`;
                            main6Text.classList.add('on');

                            if(mainSection6Top + windowHeight > 0) {
                                main6PinTit.style.transform = `translate(0, ${-mainSection6Top.toFixed(0)}px)`;
                            }
                        } else {
                            mainSection6Con.style.transform = `translate(0, ${(mainSection6Height - windowHeight).toFixed(0)}px)`;
                        }
                    } else {
                        main6PinTit.classList.remove('on');
                        main6PinTit.style.transform = `translate(0, 0)`;
                        mainSection6Con.style.clipPath = `circle(0)`;
                    }
                }

            });
        }

        //메인슬라이더 프로그레스바설정
        const progressBar = document.querySelectorAll('.progress-circle');
        updateProgressBar(progressBar);
        setMainSliderTxtOn(0);

        //뉴스게시판 리스트 가져오기
        getNewsList();

    }, []);


    //팝업리스트 가져오기
    useEffect(()=>{
        if(popupType !== null){
            getPopupList();
        }
    },[popupType]);


    //팝업리스트 가져오기
    const getPopupList = () => {
        axios.get(`${auth_popup_list}?p_type=${popupType}`)
        .then((res)=>{
            if(res.status === 200){
                const list = res.data.data.popup_list;

                //현재날짜
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0); //시간제거

                // 레이어팝업--------
                let popList = list.filter((item)=>item.p_layer_pop[0] == 1);
                popList = popList.filter(item => {
                    // p_e_date에 값이 있으면 현재 날짜와 비교
                    if (item.p_e_date) {
                        const endDate = new Date(item.p_e_date.replace(/\./g, '-'));
                        return endDate > currentDate;
                    }
                    // p_e_date에 값이 없거나 빈 문자열이면 포함
                    return true;
                });
                setPopupList(popList);
                
                // 새창팝업--------
                const hideList = util.getCookie("hidePopupList") || [];
                let openPopList = list.filter((item)=>item.p_layer_pop[0] == 2);
                //쿠키에 저장된 오늘은그만보기 팝업제외하고 노출
                openPopList = openPopList.filter(item => !hideList.includes(item.idx));

                openPopList = openPopList.filter(item => {
                    // p_e_date에 값이 있으면 현재 날짜와 비교
                    if (item.p_e_date) {
                        const endDate = new Date(item.p_e_date.replace(/\./g, '-'));
                        return endDate > currentDate;
                    }
                    // p_e_date에 값이 없거나 빈 문자열이면 포함
                    return true;
                });

                const openPopups = () => {
                    openPopList.forEach(item => {
                        const { idx, p_title, p_width_size, p_height_size, p_top_point, p_left_point } = item;
                        const popupUrl = `/openpopup/${idx}`;
                        const property = `width=${p_width_size},height=${p_height_size},top=${p_top_point},left=${p_left_point},scrollbars=no,toolbar=no`;

                        // 팝업 창 열기
                        const popupWindow = window.open(popupUrl, p_title, property);

                        // 팝업 창에 콘텐츠 추가
                        if (popupWindow) {
                            // 팝업 창에서 URL로 이동하는 JavaScript 코드 추가
                            popupWindow.document.write(`<script>window.location.href = "${popupUrl}";</script>`);
                        }
                    });
                }
                openPopups();
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: err_msg,
                confirmPopBtn:1,
            }));
            setConfirm(true);
        });
    };


    //뉴스게시판 리스트 가져오기
    const getNewsList = () => {
        axios.get(`${board_list.replace(":category",49).replace(":limit",8)}`)
        .then((res)=>{
            if(res.status === 200){
                let list = res.data.data.board_list;

                // list의 길이가 1보다 크고 4보다 작을 때만 6개까지 복사 (슬라이드 루프때문)
                if (list.length > 1 && list.length < 4) {
                    while (list.length < 6) {
                        list = list.concat([...list]);
                    }
                }

                setNewsList(list);
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: err_msg,
                confirmPopBtn:1,
            }));
            setConfirm(true);
        });
    };


    //navigation 클릭시 해당 섹션으로 이동
    const scrollToIndex = (index) => {
        if (scrollbarRef.current) {
          const element = document.getElementById(`sect${index}`);
          if (element) {
            scrollbarRef.current.scrollIntoView(element, { // 해당 요소가 보이도록 스크롤
                alignToTop: true, // 최상단에 정렬
                onlyScrollIfNeeded: true, // 필요한 경우에만 스크롤
            });
          }
        }
    };


    //탑버튼 클릭시
    const onTopHandler = () => {
        scrollbarRef.current.scrollTo(0, 0, 3000);
    };


    // 메인슬라이더--------------------------------------------
    const initMainSwiper = (swiper) => {
        setMainSwiper(swiper);
    };


    //메인슬라이드 변경시
    const mainSlideChange = (idx) => {
        const progressBar = document.querySelectorAll('.progress-circle');
        setMainSliderTxtOn(idx);
        if(!progressPaused){
            updateProgressBar(progressBar);
        }
    };
    
    //프로그레스 바 업데이트
    const updateProgressBar = (elements) => {
        elements.forEach(el => {
            const valueR = 2 * Math.PI * el.getAttribute("r");
            const parseValue = parseInt(valueR);
            if (el.progressAnimation) {
                clearInterval(el.progressAnimation);
                el.style.strokeDashoffset = parseValue;
            }
            let currentProgress = 0;
            el.style.strokeDashoffset = parseValue;
            const step = (parseValue / autoplayDuration) * 50;
            el.progressAnimation = setInterval(() => {
                currentProgress += step;
                currentProgress = Math.max(0, currentProgress.toFixed(0));
                el.style.strokeDashoffset = (parseValue.toFixed(0) - currentProgress);
                if (currentProgress >= parseValue) {
                    clearInterval(el.progressAnimation);
                }
            }, 50);
        });
    }

    //메인슬라이드 재생/정지 버튼클릭시
    const mainSlideBtnClickHandler = (e) => {
        setProgressPaused(!progressPaused);
        const progressBar = document.querySelectorAll('.progress-circle');
        if (mainSwiper.autoplay.running) {
            mainSwiper.autoplay.stop();
            progressBar.forEach((el) => {
                const valueR = 2 * Math.PI * el.getAttribute("r");
                const parseValue = parseInt(valueR);
                el.style.strokeDashoffset = parseValue;
                clearInterval(el.progressAnimation)
            });
        } else {
            mainSwiper.autoplay.start();
            updateProgressBar(progressBar);
        }
    };


    // 메인 how슬라이더--------------------------------------------
    const initHowSwiper = (swiper) => {
        setHowSwiper(swiper);
    };

    //메인 how슬라이더 변경시
    const howSlideChange = (idx) => {
        setHowSliderNaviOn(idx);
    }

    //메인 how슬라이드 navi 변경시
    useEffect(() => {
        if (howSwiper) {
            howSwiper.update();
            howSwiper.slideTo(howSliderNaviOn);

            // 메인섹션4 프로그레스 바 진행도에 따라 색 변경
            const progress = (howSwiper.realIndex + 1) / howSwiper.slides.length;
            const brightness = 1 - progress.toFixed(2);
            const howProgressBar = document.querySelector('.how_slider_wrap .slide_progress_bar span');
            const progressBarIcon = howProgressBar.querySelector('i');
            const totalSlides = howSwiper.slides.length;
            const reversedIndex = totalSlides - howSwiper.realIndex;

            howProgressBar.style.filter = `brightness(${brightness})`;
            progressBarIcon.style.transform = `translate(50%, -100%) scaleX(${reversedIndex})`
        }
    }, [howSliderNaviOn, howSwiper]);


    // 메인 뉴스슬라이더--------------------------------------------
    const initNewsSwiper = (swiper) => {
        setNewsSwiper(swiper);
    };

    //뉴스슬라이드 active index 0
    useEffect(() => {
        if (newsSwiper) {
            newsSwiper.update();
            newsSwiper.slideTo(0);
        }
    }, [newsList, newsSwiper]);



    return(<>
        <Scrollbar 
            className="smooth_scroll_area"
            ref={scrollbarRef}
            damping={0.05}
        >
            <main id="main" className="main main_page">
                <section className="user_section">
                    <div className="page_inner">
                        <div className="page_user_main">
                            <div className="main_navigation">
                                <ul className="main_section_navigation">
                                    <li className="active">
                                        <button type="button" onClick={()=>scrollToIndex(1)}>
                                            <span>MAIN</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={()=>scrollToIndex(2)}>
                                            <span>About</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={()=>scrollToIndex(3)}>
                                            <span>Product</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={()=>scrollToIndex(4)}>
                                            <span>Operation</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={()=>scrollToIndex(5)}>
                                            <span>News</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={()=>scrollToIndex(6)}>
                                            <span>Search</span>
                                        </button>
                                    </li>
                                </ul>
                                <div className="ic_scroll">
                                    <span>스크롤하세요</span>
                                </div>
                                <button type="button" className="btn_top" onClick={onTopHandler}>탑버튼</button>
                            </div>
                            <div className="main_section_wrap">
                                <div className="section main_section main_section1 main_slider_wrap" id="sect1" ref={sect1Ref}>
                                    <Swiper
                                        className="main_slider swiper"
                                        modules={[EffectFade,Autoplay,Pagination]}
                                        effect="fade"
                                        simulateTouch={false}
                                        speed={500}
                                        loop={true}
                                        autoplay={{ delay: autoplayDuration, disableOnInteraction: false }}
                                        pagination= {
                                            {
                                                el: '.swiper-pagination',
                                                type: 'bullets',
                                                clickable: true,
                                                renderBullet: function(index, className) {
                                                    return `<div class="${className}">
                                                        <div class="autoplay_progress">
                                                            <svg viewBox="0 0 40 40">
                                                                <circle cx="20" cy="20" r="18" class="progress-circle"></circle>
                                                            </svg>
                                                        </div>
                                                    </div>`;
                                                }
                                            }
                                        }
                                        onSwiper={initMainSwiper}
                                        onSlideChange={(e)=>{
                                            const idx = e.realIndex;
                                            mainSlideChange(idx);
                                        }}
                                    >
                                        <SwiperSlide>
                                            <div className="img">
                                                <img src={main_visual01} alt="이미지" className="pc_img"/>
                                                <img src={main_visual01_tb} alt="이미지" className="tb_img"/>
                                                <img src={main_visual01_m} alt="이미지" className="m_img"/>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="img">
                                                <img src={main_visual02} alt="이미지" className="pc_img"/>
                                                <img src={main_visual02_tb} alt="이미지" className="tb_img"/>
                                                <img src={main_visual02_m} alt="이미지" className="m_img"/>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="img">
                                                <img src={main_visual03} alt="이미지" className="pc_img"/>
                                                <img src={main_visual03_tb} alt="이미지" className="tb_img"/>
                                                <img src={main_visual03_m} alt="이미지" className="m_img"/>
                                            </div>
                                        </SwiperSlide>
                                        <div className="slide_util">
                                            <div className="swiper-pagination"></div>
                                            <button type="button" className={`btn_slide_toggle${progressPaused ? " paused" : ""}`} onClick={(e)=>{mainSlideBtnClickHandler(e)}}>슬라이드 재생/일시정지</button>
                                        </div>
                                    </Swiper>
                                    <div className="main_slider_txt">
                                        <div className={`slide_txt${mainSliderTxtOn === 0 ? " on" : ""}`}>
                                            <div className="txt txt1">
                                                <span>세상을 클리어하게 바라보는 상상을 해보세요.</span>
                                            </div>
                                            <div className="txt txt2">
                                                <span>Hello to a</span>
                                            </div>
                                            <div className="txt txt3">
                                                <span>CLEAR Vision</span>
                                            </div>
                                        </div>
                                        <div className={`slide_txt${mainSliderTxtOn === 1 ? " on" : ""}`}>
                                            <div className="txt txt1">
                                                <span>No Glasses No Contacts</span>
                                            </div>
                                            <div className="txt txt2">
                                                <span>Just</span>
                                            </div>
                                            <div className="txt txt3">
                                                <span>CLEAR Vision</span>
                                            </div>
                                        </div>
                                        <div className={`slide_txt${mainSliderTxtOn === 2 ? " on" : ""}`}>
                                            <div className="txt txt1">
                                                <span>세상을 클리어하게 바라보는 상상을 해보세요.</span>
                                            </div>
                                            <div className="txt txt2">
                                                <span>Imagine a world you can</span>
                                            </div>
                                            <div className="txt txt3">
                                                <span>See Clearly</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="main_section main_section2" id="sect2" ref={sect2Ref}>
                                    <div className="top_txt">
                                        <div className="txt">
                                            <strong className="txt1">
                                                <b>클리어라식</b>
                                            </strong>
                                            <strong className="txt2">
                                                <span>왜 사람들이</span>
                                            </strong>
                                            <strong className="txt3">
                                                <span>선택할까요?</span>
                                            </strong>
                                        </div>
                                        <em>What’s different with CLEAR?</em>
                                    </div>
                                    <div className="inner_section_wrap">
                                        <div className="object_image_wrap">
                                            <div className="pin_txt">
                                                <strong><b>W</b>hat?</strong>
                                            </div>
                                            <div className="object_image">
                                                <img src={img_object1} alt="이미지" className="pc_img"/>
                                                <img src={img_object1_tb} alt="이미지" className="tb_img"/>
                                                <img src={img_object1_m} alt="이미지" className="m_img"/>
                                            </div>
                                            <div className="object_image">
                                                <img src={img_object2} alt="이미지" className="pc_img"/>
                                                <img src={img_object2_tb} alt="이미지" className="tb_img"/>
                                                <img src={img_object2_m} alt="이미지" className="m_img"/>
                                            </div>
                                            <div className="object_image">
                                                <img src={img_object3} alt="이미지" className="pc_img"/>
                                                <img src={img_object3_tb} alt="이미지" className="tb_img"/>
                                                <img src={img_object3_m} alt="이미지" className="m_img"/>
                                            </div>
                                        </div>
                                        <div className="bg">
                                            <div className="bg_item bg1">
                                                <img src={img_main2_1} alt="이미지" className="pc_img"/>
                                                <img src={img_main2_1_tb} alt="이미지" className="tb_img"/>
                                                <img src={img_main2_1_m} alt="이미지" className="m_img"/>
                                            </div>
                                            <div className="bg_item bg2">
                                                <img src={img_main2_2} alt="이미지" className="pc_img"/>
                                                <img src={img_main2_2_tb} alt="이미지" className="tb_img"/>
                                                <img src={img_main2_2_m} alt="이미지" className="m_img"/>
                                            </div>
                                            <div className="bg_item bg3">
                                                <img src={img_main2_3} alt="이미지" className="pc_img"/>
                                                <img src={img_main2_3_tb} alt="이미지" className="tb_img"/>
                                                <img src={img_main2_3_m} alt="이미지" className="m_img"/>
                                            </div>
                                        </div>
                                        <div className="inner_section inner_section1">
                                            <div className="txt">
                                                <strong>클리어라식은 다릅니다.</strong>
                                                <span>클리어라식은 각막내부가 노출되지 않습니다.</span>
                                            </div>
                                        </div>
                                        <div className="inner_section inner_section2">
                                            <div className="txt">
                                                <strong>라섹과 라식의 한계를 <br/>넘은 차세대 시력 교정술</strong>
                                                <span>잔여 각막으로 외부충격에 강합니다.</span>
                                            </div>
                                        </div>
                                        <div className="inner_section inner_section3">
                                            <div className="txt">
                                                <strong>맞춤형 근시 및 난시 교정</strong>
                                                <span>빠른 속도로 맞춤 정밀 시력 교정이 가능하여 <br/>근시와 난시를 교정할 수 있습니다.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="main_section main_section3" id="sect3" ref={sect3Ref}>
                                    <div className="fixed_content">
                                        <div className="img">
                                            <img src={img_main3} alt="FEMTO LDV Z8"/>
                                        </div>
                                        <div className="txt_con_wrap">
                                            <div className="txt_con txt_con1 on">
                                                <div className="txt">
                                                    <strong>
                                                        <span>보다</span>
                                                        <b>깨끗한 세상,</b>
                                                    </strong>
                                                    <em>개개인을 위한 맞춤형 수술<br/>클리어는 가능합니다.</em>
                                                </div>
                                                <p>클리어 라식은 각막을 중심으로 절삭이 진행되어 <br/>매끄러운 교정이 어려웠던 기존의 라식의 한계점을 보완합니다.</p>
                                            </div>
                                            <div className="txt_con txt_con2">
                                                <div className="txt">
                                                    <strong>
                                                        <span>클리어라식은</span>
                                                    </strong>
                                                    <div className="move_txt">
                                                        <span>맞춤형 교정</span>
                                                    </div>
                                                </div>
                                                <p>고해상도의 OCT 실시간 이미지를 통해 각막 실질층을 확인해 <br/>안구 회전(C축)과 난시축을 더욱 정밀하게 교정합니다.</p>
                                            </div>
                                            <div className="txt_con txt_con3">
                                                <div className="txt">
                                                    <strong>
                                                        <span>클리어라식은</span>
                                                    </strong>
                                                    <div className="move_txt">
                                                        <span>손상 최소화</span>
                                                    </div>
                                                </div>
                                                <p>낮은 에너지의 정교한 레이저 조사로 각막 2mm 가량 절개하여 <br/>각막 신경 손상을 최소화하여 기존 라식 수술 대비 안구건조증 발생률을 낮췄습니다.</p>
                                            </div>
                                            <div className="txt_con txt_con4">
                                                <div className="txt">
                                                    <strong>
                                                        <span>클리어라식은</span>
                                                    </strong>
                                                    <div className="move_txt">
                                                        <span>수술 후 적은 통증</span>
                                                    </div>
                                                </div>
                                                <p>다른 안과 레이저 수술과는 달리, 클리어는 수술 시간이 짧으며 환자에게 부담이 덜 합니다. <br/>클리어 (CLEAR) 는 낮은 에너지를 사용하는 안전한 최소 침습 시력 교정 수술이며, <br/>때문에 술 후 각막이 안정되는 데 더 도움이 됩니다.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="scroll_content">
                                        <div className="con con1"></div>
                                        <div className="con con2">
                                            <div className="card">
                                                <img src={prd_card1} alt="이미지"/>
                                            </div>
                                        </div>
                                        <div className="con con3">
                                            <div className="card">
                                                <img src={prd_card2} alt="이미지"/>
                                            </div>
                                        </div>
                                        <div className="con con4">
                                            <div className="card">
                                                <img src={prd_card3} alt="이미지"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="section main_section main_section4" id="sect4" ref={sect4Ref}>
                                    <div className="how_box">
                                        <div className="how_tit">
                                            <h2>
                                                <i><b>H</b>ow?</i>
                                                <strong>
                                                    <span>클리어라식</span>
                                                </strong>
                                                <p>
                                                    <span>어떻게 진행될까요?</span>
                                                </p>
                                                <em>How to Clear LASIK process</em>
                                            </h2>
                                            <ul className="list_how_slider_navi">
                                                <li className={howSliderNaviOn === 0 ? "on" : ""}>
                                                    <button type="button" onClick={()=>setHowSliderNaviOn(0)}>렌티큘 생성</button>
                                                </li>
                                                <li className={howSliderNaviOn === 1 ? "on" : ""}>
                                                    <button type="button" onClick={()=>setHowSliderNaviOn(1)}>렌티큘 추출</button>
                                                </li>
                                                <li className={howSliderNaviOn === 2 ? "on" : ""}>
                                                    <button type="button" onClick={()=>setHowSliderNaviOn(2)}>교정시력</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="how_slider_wrap">
                                            <div className="how_slider_con">
                                                <div className="slider_inner">
                                                    <div className="img_wrap">
                                                        <div className={`slide_img${howSliderNaviOn === 0 ? " on" : ""}`}>
                                                            <img src={img_how1} alt="이미지"/>
                                                        </div>
                                                        <div className={`slide_img${howSliderNaviOn === 1 ? " on" : ""}`}>
                                                            <img src={img_how2} alt="이미지"/>
                                                        </div>
                                                        <div className={`slide_img${howSliderNaviOn === 2 ? " on" : ""}`}>
                                                            <img src={img_how3} alt="이미지"/>
                                                        </div>
                                                    </div>
                                                    <Swiper
                                                        className="how_slider swiper"
                                                        modules={[EffectFade,Autoplay,Pagination]}
                                                        effect="fade"
                                                        fadeEffect= {{
                                                            crossFade: true
                                                        }}
                                                        autoplay={{ delay: autoplayDuration, disableOnInteraction: false }}
                                                        pagination= {
                                                            {
                                                                el: '.how_slider_wrap .swiper-pagination',
                                                                type: 'progressbar',
                                                                renderProgressbar: function(progressbarFillClass) {
                                                                    return `<span class="${progressbarFillClass}">
                                                                        <i style="transform: translate(50%, -100%) scaleX(${this.slides.length})"></i>
                                                                    </span>`;
                                                                }
                                                            }
                                                        }
                                                        onSwiper={initHowSwiper}
                                                        onSlideChange={(e)=>{
                                                            const idx = e.realIndex;
                                                            howSlideChange(idx);
                                                        }}
                                                    >
                                                        <SwiperSlide>
                                                            <div className="slide_txt_wrap">
                                                                <div className="slide_txt on">
                                                                    <strong>렌티큘 생성</strong>
                                                                    <p>작은 원반 형태의 각막 조직 조각인 렌티큘을 만들고 <br/>각막을 미세하게 절개합니다.</p>
                                                                    <Link to="/clearlasik" className="btn_style1">
                                                                        <span>Read more</span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="slide_txt_wrap">
                                                                <div className="slide_txt">
                                                                    <strong>렌티큘 추출</strong>
                                                                    <p>절개된 부분을 통해 각막의 자극을 최소화 하여 <br/>렌티큘을 제거합니다.</p>
                                                                    <Link to="/clearlasik" className="btn_style1">
                                                                        <span>Read more</span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="slide_txt_wrap">
                                                                <div className="slide_txt">
                                                                    <strong>교정시력</strong>
                                                                    <p>렌티큘을 제거함으로써 각막의 형태에 변화를 주어 <br/>굴절 이상을 교정합니다.</p>
                                                                    <Link to="/clearlasik" className="btn_style1">
                                                                        <span>Read more</span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    </Swiper>
                                                </div>
                                            </div>
                                            <div className="slide_progress_bar swiper-pagination"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="section main_section main_section5" id="sect5" ref={sect5Ref}>
                                    <h2>지머의 다양한 소식을 <br/>만나보세요.</h2>
                                    <div className="new_slider_wrap">
                                        <Swiper
                                            className="news_slider swiper"
                                            loop={true}
                                            speed={500}
                                            slidesPerView={1.2}
                                            spaceBetween={18}
                                            centeredSlides={true}
                                            onSwiper={initNewsSwiper}
                                            observer={true}
                                            observeParents={true}
                                            breakpoints={
                                                {
                                                    1418:{slidesPerView:"auto",spaceBetween:0,centeredSlides:false}, //width >= 1418
                                                    767:{slidesPerView:1.5,spaceBetween:80,centeredSlides:true},  //width >= 767
                                                }
                                            }
                                        >
                                            {newsList.map((cont,i)=>{
                                                const img = api_uri+cont.b_img;
                                                return(
                                                    <SwiperSlide key={i}>
                                                        <Link to={`/news/${cont.category}/${cont.idx}`}>
                                                            <div className="card">
                                                                <div className="img">
                                                                    <img src={img} alt="이미지"/>
                                                                </div>
                                                                <b>NEWS</b>
                                                                <strong>{cont.b_title}</strong>
                                                                <p></p>
                                                                <em>{cont.b_reg_date}</em>
                                                            </div>
                                                        </Link>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                    <div className="btn_wrap">
                                        <Link to="/news" className="btn_style1">
                                            <span>Read more</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="main_section main_section6" id="sect6" ref={sect6Ref}>
                                    <div className="pin_tit">
                                        <h2>
                                            <span>
                                                <i>WITH</i>
                                            </span>
                                            <strong>
                                                <i>ZIEMER</i>
                                            </strong>
                                        </h2>
                                    </div>
                                    <div className="section_con">
                                        <div className="con_inner">
                                            <h3>
                                                <span>WITH</span>
                                            </h3>
                                            <h4>
                                                <span>CLEAR</span>
                                            </h4>
                                            <div className="img">
                                                <img src={img_with} alt="이미지"/>
                                            </div>
                                            <div className="txt_wrap">
                                                <p>클리어라식을 이용하는 전국의 병원을 안내해드립니다. <br/>현재 지머와 함께하는 병원을 확인해보세요.</p>
                                                <Link to="/hospital" className="link">병원 검색페이지 이동</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer main={true} />
        </Scrollbar>
        
        {/* 관리자단에서 설정한 팝업 */}
        <UserPop
            list={popupList}
            mo={popupType == "M" ? true : false}
        />

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Main;