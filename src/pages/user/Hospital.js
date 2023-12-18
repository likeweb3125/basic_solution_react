import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as CF from "../../config/function";
import { hospitalPop, confirmPop, inquirePop } from "../../store/popupSlice";
import img_hospital1 from "../../images/user_images/img_hospital1.png";
import ConfirmPop from "../../components/popup/ConfirmPop";


const Hospital = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const contRef = useRef(null);
    const [confirm, setConfirm] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");

    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);

    //울산,대구,경남 > 경상 / 대전,충북 > 충청 / 인천 > 경기로 구분
    const [allList, setAllList] = useState(
        [
            {
                id: 1,
                area: "서울",
                name: "강남그랜드안과",
                address: "서울특별시 서초구 강남대로 363 강남타워 4층, 5층",
                tel: "02-3487-7582",
                link: "https://www.grandeye.kr/?utm_source=naver_ba&utm_medium=cpc&utm_campaign=Brand&NaPm=ct%3Dld2g18ao%7Cci%3D0zG0002CCWvxesC6XLkQ%7Ctr%3Dbrnd%7Chk%3Dc27c8556f291fca6b11c195c485a8547036f9f98",
                mapKey: "2asa7",
                mapTimestamp: "1656483406347"
            },
            {
                id: 2,
                area: "서울",
                name: "강남성모안과",
                address: "서울특별시 서초구 강남대로 415 대동빌딩 5층",
                tel: "0507-1427-9977",
                link: "https://www.4vision.co.kr:6062/",
                mapKey: "2auww",
                mapTimestamp: "1657092928296"
            },
            {
                id: 3,
                area: "서울",
                name: "강남아이원스안과",
                address: "서울특별시 서초구 사평대로 368 케이플라츠 신논현 5, 6층",
                tel: "02-593-3313",
                link: "eyeonce.com",
                mapKey: "2asa5",
                mapTimestamp: "1656483308795"
            },
            {
                id: 4,
                area: "서울",
                name: "강남 큐브안과",
                address: "서울 강남구 테헤란로4길 5 해암빌딩 3층",
                tel: "0507-1470-2082",
                link: "http://www.cubeeye.kr",
                mapKey: "2aux7",
                mapTimestamp: "1657093036176"
            },
            {
                id: 5,
                area: "충청",
                name: "보다안과",
                address: "대전 서구 둔산중로 50 파이낸스빌딩",
                tel: "042-528-0079",
                link: "bodaeye.com",
                mapKey: "2asar",
                mapTimestamp: "1656484977642"
            },
            {
                id: 6,
                area: "충청",
                name: "새봄안과",
                address: "대전광역시 유성구 계룡로 114 BYC빌딩 7층",
                tel: "042-826-2475",
                link: "http://www.sbeye.co.kr",
                mapKey: "2asb2",
                mapTimestamp: "1656485290930"
            },
            {
                id: 7,
                area: "충청",
                name: "케임씨잉안과",
                address: "대전 유성구 계룡로 105",
                tel: "1588-7655",
                link: "http://www.cameseeing.com/",
                mapKey: "2asb4",
                mapTimestamp: "1656485366930"
            },
            {
                id: 8,
                area: "서울",
                name: "센트럴서울안과",
                address: "서울 용산구 이촌로 224 한강쇼핑센터 2층 ",
                tel: "02-792-2226",
                link: "https://www.cseye.net/main/main.php?utm_source=NAVER_BA&utm_medium=PPC&n_media=27758&n_query=%EC%84%BC%ED%8A%B8%EB%9F%B4%EC%84%9C%EC%9A%B8%EC%95%88%EA%B3%BC&n_rank=1&n_ad_group=grp-a001-04-000000018161195&n_ad=nad-a001-04-000000202759425&n_keyword_id=nkw-a001-04-000003327582777&n_keyword=%EC%84%BC%ED%8A%B8%EB%9F%B4%EC%84%9C%EC%9A%B8%EC%95%88%EA%B3%BC&n_campaign_type=4&n_contract=tct-a001-04-000000000645952&n_ad_group_type=5&NaPm=ct%3Dld2fopog%7Cci%3D0zi0001uCqvxO7leoL0N%7Ctr%3Dbrnd%7Chk%3Dfedd0209cf839be704c4a9117a28b6fffc192560",
                mapKey: "2asb7",
                mapTimestamp: "1656485448993"
            },
            {
                id: 9,
                area: "경상",
                name: "울산성모안과",
                address: "울산광역시 남구 삼산로 201 성모안과",
                tel: "052-275-0775",
                link: "https://www.sungmoeye.co.kr/intro.html",
                mapKey: "2asbd",
                mapTimestamp: "1656485576418"
            },
            {
                id: 10,
                area: "경상",
                name: "이성수안과",
                address: "경남 진주시 진주대로 863",
                tel: "055-746-6000",
                link: "http://www.lasik114.com/",
                mapKey: "2asbe",
                mapTimestamp: "1656485627305"
            },
            {
                id: 11,
                area: "서울",
                name: "퍼스트삼성안과",
                address: "서울특별시 서초구 서초대로78길 22 홍우제2빌딩 5, 6층",
                tel: "02-1661-1191",
                link: "https://www.firstsamsung.co.kr/?eventCode=naver_brand_PC&n_media=27758&n_query=%ED%8D%BC%EC%8A%A4%ED%8A%B8%EC%82%BC%EC%84%B1%EC%95%88%EA%B3%BC&n_rank=1&n_ad_group=grp-a001-04-000000022217153&n_ad=nad-a001-04-000000151307242&n_keyword_id=nkw-a001-04-000003985203416&n_keyword=%ED%8D%BC%EC%8A%A4%ED%8A%B8%EC%82%BC%EC%84%B1%EC%95%88%EA%B3%BC&n_campaign_type=4&n_contract=tct-a001-04-000000000640094&n_ad_group_type=5&NaPm=ct%3Dld2fpw48%7Cci%3D0zu0002lCqvxRchFQuZ1%7Ctr%3Dbrnd%7Chk%3D97f1bc5fc35ed0b69b1ed4e44ca8074e107f8b94",
                mapKey: "2asbf",
                mapTimestamp: "1656485719761"
            },
            {
                id: 12,
                area: "서울",
                name: "불광서울안과",
                address: "서울특별시 은평구 통일로 715 WB은평타워 4층",
                tel: "02-357-8855",
                link: "http://www.bulgwangseouleyeclinic.com",
                mapKey: "2bqbd",
                mapTimestamp: "1663292531408"
            },
            {
                id: 13,
                area: "충청",
                name: "청주삼성안과",
                address: "충청북도 청주시 흥덕구 대농로 43 지웰시티몰 3층",
                tel: "043-268-0079",
                link: "http://www.cjlasik.com/base/sub3/001.php",
                mapKey: "2cf7g",
                mapTimestamp: "1667869338308"
            },
            {
                id: 14,
                area: "부산",
                name: "굿모닝성모안과",
                address: "부산 부산진구 새싹로 2 4, 5, 6, 7층",
                tel: "051-809-3131",
                link: "http://www.eyedoc.co.kr/land/index.php?event_no=59",
                mapKey: "2cf7j",
                mapTimestamp: "1667869470100"
            },
            {
                id: 15,
                area: "경기",
                name: "동탄퍼스트안과",
                address: "경기 화성시 동탄오산로 82 동탄역퍼스트프라자 7층",
                tel: "031-372-7591",
                link: "http://www.firsteye.co.kr/eyesight/eyesight_clear.php",
                mapKey: "2cf7m",
                mapTimestamp: "1667869608045"
            },
            {
                id: 16,
                area: "서울",
                name: "힐링안과의원",
                address: "서울 강남구 강남대로 470",
                tel: "0507-1342-1222",
                link: "https://www.healingeye.co.kr/main/clear-lasik/",
                mapKey: "2cf7q",
                mapTimestamp: "1667869693013"
            },
            {
                id: 17,
                area: "서울",
                name: "서울온안과",
                address: "서울 은평구 통일로 750 3층",
                tel: "02-353-0112",
                link: "http://oneye.co.kr/subpage.php?p=m21",
                mapKey: "2cf7u",
                mapTimestamp: "1667869803381"
            },
            {
                id: 18,
                area: "경기",
                name: "유밸안과의원",
                address: "인천 중구 우현로 90 유타워 4, 5, 6층 유밸안과",
                tel: "080-762-0088",
                link: "http://ubaleye.co.kr/mn/01/clear.php",
                mapKey: "2ejbd",
                mapTimestamp: "1682320880957"
            },
            {
                id: 19,
                area: "경기",
                name: "연수 김안과",
                address: "인천 연수구 컨벤시아대로 165 포스코타워송도 5, 7층",
                tel: "1544-7260",
                link: "http://www.lasikeye.co.kr/01/04.php",
                mapKey: "2ejbb",
                mapTimestamp: "1682320827261"
            },
            {
                id: 20,
                area: "제주",
                name: "이지봄안과의원",
                address: "제주특별자치도 제주시 노형로 390 2층, 3층, 4층, 5층, 6층",
                tel: "064-747-0112",
                link: "http://easybomeye.com/sub/sub2-2.php",
                mapKey: "2ejba",
                mapTimestamp: "1682320772230"
            },
            {
                id: 21,
                area: "경기",
                name: "아인여성병원",
                address: "인천 미추홀구 경인로 372 아인여성병원",
                tel: "032-247-2000",
                link: "https://www.ainwh.co.kr/",
                mapKey: "2ejb6",
                mapTimestamp: "1682320620549"
            },
            {
                id: 22,
                area: "서울",
                name: "강남성모원안과",
                address: "서울 서초구 강남대로85길 5 대유빌딩 2층 ",
                tel: "0507-1302-1214",
                link: "https://www.stmaryone.com/html/correction/clearlasik.php",
                mapKey: "2ejb9",
                mapTimestamp: "1682320696605"
            },
            {
                id: 23,
                area: "서울",
                name: "클리어서울안과",
                address: "서울 서초구 서초대로77길 17 6층",
                tel: "02-599-7779",
                link: "https://clearseouleye.com/pages/lasik.php?pages=lasik1",
                mapKey: "2ejbz",
                mapTimestamp: "1682320403605"
            },
            {
                id: 24,
                area: "경기",
                name: "파주센트럴제일안과 ",
                address: "경기 파주시 경의로 1092 유은타워3차 5층",
                tel: "0507-1318-8287",
                link: "센트럴제일안과의원 (centraljeil.com)",
                mapKey: "2gzue",
                mapTimestamp: "1693360062062"
            },
            {
                id: 25,
                area: "서울",
                name: "JC 빛소망안과",
                address: "서울시 영등포구 국제금융로6길 33 맨하탄빌딩 6층(여의도동 36-2)",
                tel: "02-785-1068",
                link: "https://www.jceye.co.kr/04/10.php",
                mapKey: "2gzuj",
                mapTimestamp: "1693360424903"
            },
            {
                id: 26,
                area: "경기",
                name: "수원퍼스트안과",
                address: "경기도 수원시 영통구 덕영대로 1470, 6층 (망포역 플래티넘베이스)",
                tel: "1833-2839",
                link: "https://firsteye-suwon.co.kr/eyesight/eyesight8_2.php",
                mapKey: "2gzum",
                mapTimestamp: "1693360501230"
            },
            {
                id: 27,
                area: "경기",
                name: "파주푸른세상안과",
                address: "경기도 파주시 청암로17번길 33 (목동동 933) 현대메디칼프라자 6층",
                tel: "031-935-5015",
                link: "http://paju.lasikok.com/clinic/premium1.php",
                mapKey: "2gzuq",
                mapTimestamp: "1693360573406"
            },
            {
                id: 28,
                area: "경상",
                name: "대구 로운안과",
                address: "대구광역시 달서구 월곡로 260 3층 304호, 305호",
                tel: "053-634-8575",
                link: "https://blog.naver.com/rouneye",
                mapKey: "2gzuu",
                mapTimestamp: "1693360644661"
            },
            {
                id: 29,
                area: "충청",
                name: "대전소중한빛안과",
                address: "대전 서구 계룡로 605 상아빌딩 2층",
                tel: "042-524-7588",
                link: "http://www.valueye.co.kr/03_correction/correction07.php",
                mapKey: "2gzuv",
                mapTimestamp: "1693360679278"
            },
            {
                id: 30,
                area: "경상",
                name: "창원밝은힐링안과",
                address: "경남 창원시 진해구 충장로 128",
                tel: "055-545-9100",
                link: "http://opht.xn--vb0b45v72i2ms.com/pages/sub1-1.php",
                mapKey: "2g2c4",
                mapTimestamp: "1693444191586"
            },
            {
                id: 31,
                area: "서울",
                name: "서울삼성안과",
                address: "서울 광진구 천호대로 670 썬타워빌딩 지하1층, 1층",
                tel: "02-2201-2020",
                link: "http://서울삼성안과.com/",
                mapKey: "2gxbu",
                mapTimestamp: "1700639822664"
            },
        ]
    );
    const [list, setList] = useState([]);           //검색된 전체리스트
    const [areaList, setAreaList] = useState([
        {area:"서울",list:[]},
        {area:"경기",list:[]},
        {area:"강원",list:[]},
        {area:"충청",list:[]},
        {area:"경상",list:[]},
        {area:"부산",list:[]},
        {area:"전라",list:[]},
        {area:"제주",list:[]},
    ]);
    const [areaTxt, setAreaTxt] = useState("전국");
    const [areaOn, setAreaOn] = useState(false);
    const [areaOnIdx, setAreaOnIdx] = useState(null);


    useEffect(()=>{
        setList(allList);

        const newAreaList = [...areaList];
        const list1 = allList.filter((item)=>item.area == "서울");
        const list2 = allList.filter((item)=>item.area == "경기");
        const list3 = allList.filter((item)=>item.area == "강원");
        const list4 = allList.filter((item)=>item.area == "충청");
        const list5 = allList.filter((item)=>item.area == "경상");
        const list6 = allList.filter((item)=>item.area == "부산");
        const list7 = allList.filter((item)=>item.area == "전라");
        const list8 = allList.filter((item)=>item.area == "제주");

        newAreaList[0].list = list1;
        newAreaList[1].list = list2;
        newAreaList[2].list = list3;
        newAreaList[3].list = list4;
        newAreaList[4].list = list5;
        newAreaList[5].list = list6;
        newAreaList[6].list = list7;
        newAreaList[7].list = list8;

        setAreaList(newAreaList);

    },[]);


    //지도 지역클릭시
    const areaClickHandler = (data,idx) => {
        setAreaOn(true);
        setAreaOnIdx(idx);
        setAreaTxt(data.area);
        setList(data.list);

        //리스트맨위로 스크롤이동
        contRef.current.scrollIntoView({behavior:"smooth"});
    };


    //검색하기
    const searchHandler = () => {
        if(searchTxt.length > 0){
            const newList = list.filter((item)=>item.name.includes(searchTxt));
            setList(newList);
        }else{
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'검색어를 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }
    };

    
    return(<>
        <div className="page_user_hospital">
            <div className="location_wrap">
                <ul className="location">
                    <li>
                        <Link to="/" className="btn_home">홈</Link>
                    </li>
                    <li>병원 찾기</li>
                    <li>병원 찾기</li>
                </ul>
            </div>
            <div className="section_tit">
                <span>
                    <i>지머와 함께하는</i>
                </span>
                <span>
                    <i>전국의 <b>클리어라식 안과</b>를 확인해보세요.</i>
                </span>
            </div>
            <div className="section_wrap" ref={contRef}>
                <div className="section_con hospital_section1">
                    <div className="map_box">
                        <div className="map_inner">
                            <div className="map">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 827" fill="none">
                                    <g filter="url(#filter0_d_450_36599)">
                                        <path className={`area area1${areaOnIdx === 1 ? " on" : ""}`} map-data="서울" d="M142.224 174.491L135.63 157L122.86 157.446L116.931 174.045L105.49 173.599L102.181 182.017L89.4237 178.031L87 186.659L96.4732 199.941L108.787 213L126.392 208.581L138.484 209.683L153 189.766L139.8 186.659L142.224 174.491Z" fill="#E6E8EE" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                                        <path className={`area area2${areaOnIdx === 2 ? " on" : ""}`} map-data="경기" d="M231.447 194.372L230.741 188.033L215.957 184.751L214.312 180.293L198.587 175.365L191.288 141.408L203.907 132.904L202.761 123.283L184.499 113.408L177.797 98.7706L165.884 97.6243L155.117 90.9819L140.686 94.1855L132.436 77.6871L123.717 73.8074L117.035 83.6242L117.652 91.021L107.689 95.9098L104.75 107.157L94.7172 118.061L81.9123 123.077L80.8738 137.607L73.9569 153.351L61.926 153.527L59.4375 176.57L71.4783 181.743L74.9954 195.175L79.1005 201.896L76.7883 211.046L86.1349 225.488L95.9908 231.562L95.4716 237.117L83.7541 235.02L79.9528 238.42L83.1369 244.69L79.1592 246.767L81.2363 256.799L89.1916 257.495L91.2294 260.777L90.1223 269.83L94.0412 273.229L102.594 270.192L107.708 272.191L106.67 280.499L98.5381 282.919L109.521 297.085L125.833 293.411L142.733 287.073L159.163 298.575L165.737 293.411L183.343 274.395H196.726L201.889 267.351L213.861 257.26L224.187 239.419L224.657 220.638L228.41 208.901L222.933 199.515L231.466 194.352L231.447 194.372ZM133.779 203.405L124.687 202.582L111.451 205.893L102.192 196.135L95.0797 186.211L96.902 179.764L106.493 182.742L108.972 176.453L117.574 176.786L122.042 164.382L131.633 164.049L136.59 177.119L134.768 186.211L144.693 188.533L133.779 203.414V203.405Z" fill="#E6E8EE" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                                        <path className={`area area3${areaOnIdx === 3 ? " on" : ""}`} map-data="강원" d="M244.73 256.36L247.277 243.232L254.938 239.95L266.235 249.434L281.175 242.507L294.666 247.249L297.948 256.36H308.157L316.533 263.287H326.742L354.811 275.308L361.003 268.754L357.731 262.552L363.922 256.723L375.953 265.834L396.733 268.019L402.925 262.552L414.594 266.197L425.89 259.27L436.245 251.305L433.522 236.021L420.864 213.86L404.493 196.646V185.38L393.226 174.583V166.128L339.714 99.4778L328.917 66.618L300.613 10L295.999 11.6165L294.029 40.146L287.632 41.3608L285.378 50.6975L277.59 52.7746L270.154 60.9062L253.195 61.7782L236.069 62.1211L222.911 58.4863H202.161L193.51 62.464L187.975 61.0826L172.397 59.3485L164.265 62.9832L157.868 59.7012L137.793 62.8167L134.335 67.6565L125.518 70.772L123.715 73.4172L132.434 77.2871L140.684 93.7856L155.115 90.5819L165.882 97.2244L177.795 98.3707L184.497 113.008L202.768 122.883L203.915 132.504L191.286 141.008L198.585 174.975L214.309 179.903L215.955 184.361L230.739 187.643L231.445 193.982L222.911 199.145L228.398 208.54L224.636 220.277L224.165 239.049L219.933 246.357L226.87 256.36H244.73Z" fill="#E6E8EE" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                                        <path className={`area area4${areaOnIdx === 4 ? " on" : ""}`} map-data="충청" d="M339.989 269.35L326.743 263.677H316.535L308.158 256.751H297.949L294.667 247.639L281.177 242.897L266.236 249.824L254.94 240.34L247.278 243.622L244.731 256.751H226.871L219.934 246.748L213.84 257.28L201.868 267.371L196.705 274.415H183.332L165.726 293.431L159.152 298.594L142.723 287.093L125.822 293.431L109.51 297.095L104.229 306.462L105.934 316.22L101.016 324.175L96.4504 323.244L95.9312 309.058V296.253L91.0816 287.955L84.5077 286.916L79.4915 284.32L75.602 294.509L71.0757 294.137L68.9399 285.358L61.6998 276.159L55.0867 281.302L58.9076 287.778L52.5002 297.634L54.058 305.257L50.9425 307.5L47.6604 301.269L48.1601 289.522L42.801 290.041L33.0038 303.287L28.9674 313.731L10 316.866L13.0567 331.895L25.8617 330.514L33.4741 323.244L38.3139 329.818L37.7359 338.694L42.2524 338.753L44.5449 324.978L52.8529 325.321V337.088L59.2505 344.22L58.4177 348.286L49.0418 348.854L48.6989 354.732L56.9384 358.73V361.404L50.5996 367.018L56.5661 378.775L66.2653 382.841L66.52 388.993L55.7921 391.07V394.871L65.3052 396.948L65.3444 400.956L54.8124 410.655L55.6157 424.283L72.0554 430.69L71.0757 442.711L75.3277 453.184L101.212 440.928L100.575 431.66L110.157 424.312L129.967 424.949L134.121 431.66L147.543 434.54L163.845 429.749L176.307 449.873L194.197 451.793L207.619 442.212L240.42 447.502L254.773 424.224L261.758 417.287L260.593 405.599L249.914 407.931L237.697 402.112L240.028 385.427L242.742 361.757L233.817 359.043L231.446 351.676L241.194 336.539L254.773 329.563L259.427 322.578L292.404 306.667L297.832 316.758L313.742 310.165L312.194 296.586L330.035 276.159L339.989 269.35Z" fill="#E6E8EE" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                                        <path className={`area area5${areaOnIdx === 5 ? " on" : ""}`} map-data="경상" d="M463.845 437.322L456.007 446.091L448.346 449.02L439.813 440.163L443.291 433.844V420.246L440.126 414.24L440.44 390.208L445.818 386.406L449.61 360.169L443.918 351.313V341.506L451.432 331.385V314.397L446.142 301.817L442.654 276.913L443.085 264.059L436.883 255.241L436.247 251.695L425.891 259.66L414.595 266.587L402.926 262.942L396.734 268.409L375.955 266.224L363.924 257.113L357.732 262.942L361.004 269.144L354.812 275.698L339.989 269.349L330.035 276.158L312.194 296.586L313.742 310.164L297.832 316.758L292.404 306.667L259.427 322.578L254.773 329.563L241.194 336.539L231.446 351.675L233.817 359.043L242.742 361.757L240.028 385.427L237.697 402.111L249.914 407.931L260.593 405.599L261.758 417.287L254.773 424.223L240.42 447.502L242.487 469.016L221.159 472.964L202.378 493.646L195.48 524.008L209.902 547.198L199.938 565.734V584.486L222.913 604.031L224.735 623.743L240.861 626.222L246.426 619.237L256.889 618.727V613.535L260.211 605.423L266.03 602.464L267.235 605.521L264.002 610.693L263.806 627.123L281.275 635.373L285.419 627.682L290.543 627.574L293.658 632.59L298.576 630.905L299.811 625.428L303.73 626.212L305.591 634.775L312.498 634.873L315.202 628.015L311.597 623.929L316.29 617.669L323.569 616.777L322.178 609.978L312.42 611.771L310.598 616.777L306.963 614.955L308.452 608.352L318.67 605.481L320.091 599.123L331.759 600.171L340.577 608.058L343.359 603.933L336.305 596.987L336.364 590.864L330.594 587.494L335.629 579.47L339.617 581.125L337.569 586.534L358.251 600.357L370.272 599.515L370.517 603.728L382.715 600.857L381.333 596.997L388.407 592.441L390.68 594.254L388.181 602.219L391.591 606.765L407.913 598.986L411.038 590.981L421.257 587.014L430.633 564.764L436.158 561.355L441.792 557.887L441.88 537.371L455.576 521.353L456.928 504.825L458.467 486.014L463.816 474.953L464.658 460.042L470.791 439.723L463.845 437.322Z" fill="#E6E8EE" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                                        <path className={`area area6${areaOnIdx === 6 ? " on" : ""}`} map-data="부산" d="M347 572L339 580.5V587L357 600H369.5V605.5L381 600V593H385H390.5L387.5 600L390.5 605.5L406.5 600L410.5 593L421.5 587L431 568L441.5 558V537.5L421.5 526L394 530L375.5 554.5L347 572Z" fill="#E6E8EE" stroke="white" strokeWidth="3"/>
                                        <path className={`area area7${areaOnIdx === 7 ? " on" : ""}`} map-data="전라" d="M199.937 584.487V565.735L209.901 547.199L195.48 524.009L202.377 493.647L221.158 472.965L242.487 469.017L240.419 447.502L207.618 442.212L194.196 451.794L176.307 449.873L163.845 429.75L147.542 434.541L134.12 431.66L129.966 424.949L110.156 424.312L100.574 431.66L101.211 440.929L75.3269 453.185L68.5081 462.11L78.56 470.898L83.919 466L95.852 464.285L93.3831 470.624L84.0562 472.769L80.8721 477.364L90.8848 482.949L89.8072 489.425L72.5151 492.971L47.0522 509.636L52.1467 519.669L55.8501 516.436H71.2807L76.9336 520.707L75.9147 526.615L69.5857 524.146L50.4518 528.31L41.0465 540.106L41.507 552.95L29.0352 568.841L31.3179 584.644L44.1228 602.847L36.5202 622.52L35.9422 657.015L55.5464 671.77L51.794 690.718L45.5434 698.791L45.034 708.705L49.2664 712.517L49.1782 717.778L46.7779 723.156L51.5295 727.379L51.2062 735.148L62.3358 732.473L63.247 722.186L71.2611 713.624L83.3312 706.609L83.1745 696.528L86.4075 686.828H91.218L90.297 697.458L91.1984 708.754L106.335 712.879L108.628 702.259L116.495 689.572L124.568 681.097L140.488 673.798L144.956 667.645L142.957 663.051L150.765 658.367L154.919 661.336L173.975 655.703L174.827 650.54L168.968 648.992L169.938 644.877L183.782 645.905L198.585 632.679L207.266 633.61L224.734 623.744L222.912 604.032L199.937 584.487Z" fill="#E6E8EE" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                                        <path className={`area area8${areaOnIdx === 8 ? " on" : ""}`} map-data="제주" d="M144.017 766.547L105.847 768.419L87.6928 777.491H71.9487L52.7266 801.249L65.8058 821H79.4239L87.9671 813.525L109.589 814.328L125.598 808.185L145.888 800.72L157.361 781.498L144.017 766.547Z" fill="#E6E8EE" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_450_36599" x="0.5" y="0.499756" width="543.793" height="894" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dx="32" dy="32"/>
                                            <feGaussianBlur stdDeviation="20"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.847309 0 0 0 0 0.858092 0 0 0 0 0.895833 0 0 0 0.24 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_450_36599"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_450_36599" result="shape"/>
                                        </filter>
                                    </defs>
                                </svg>
                                <div className="map_link">
                                    {areaList.map((cont,i)=>{
                                        const idx = i+1;
                                        return(
                                            <button type="button" key={i} className={`link link${idx}${cont.list.length === 0 ? " off" : ""}${areaOnIdx === idx ? " on" : ""}`}
                                                onMouseOver={()=>{
                                                    if(!areaOn){
                                                        setAreaOnIdx(idx);
                                                    }
                                                }}
                                                onMouseOut={()=>{
                                                    if(!areaOn){
                                                        setAreaOnIdx(null);
                                                    }
                                                }}
                                                onClick={()=>{
                                                    areaClickHandler(cont,idx);
                                                }}
                                            >
                                                <div className="link_txt">
                                                    <div className="txt_box">
                                                        <span>{cont.area}</span>
                                                        <strong>{CF.MakeIntComma(cont.list.length)}</strong>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list_hospital_wrap">
                        <div className="util_wrap">
                            <span>{areaTxt} <b>{CF.MakeIntComma(list.length)}개</b></span>
                            <div className="search_box_type1">
                                <div className="select_box">
                                    <div className="select">
                                        <select>
                                            <option value="name">병원명</option>
                                            {/* <option value="">지역명</option> */}
                                        </select>
                                    </div>
                                </div>
                                <div className="search_input">
                                    <input type="text" placeholder="검색어를 입력해주세요." title="병원 검색" value={searchTxt} 
                                        onChange={(e)=>{
                                            const val = e.currentTarget.value;
                                            setSearchTxt(val);
                                        }}
                                        onKeyDown={(e)=>{
                                            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                                e.preventDefault(); // Enter 키의 기본 동작(줄 바꿈)을 막음
                                                searchHandler(); // 엔터 키를 눌렀을 때 이벤트 핸들러 실행
                                            }
                                        }}
                                    />
                                    <button type="button" className="btn_map_search" onClick={searchHandler}>검색하기</button>
                                </div>
                            </div>
                        </div>
                        <ul className="list_hospital">
                            {list.map((cont,i)=>{
                                const logoSrc = require(`../../images/hospital/logo_hospital${cont.id}.png`);
                                return(
                                    <li key={i} onClick={()=>dispatch(hospitalPop({hospitalPop:true,hospitalPopData:cont}))}>
                                        <div className="hospital">
                                            <div className="logo_box">
                                                <img src={logoSrc} alt="logo"/>
                                            </div>
                                            <span>{cont.name}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="section_con hospital_section2">
                    <div className="txt_section_con">
                        <strong>지금 <b>지머의 클리어라식과</b> <br/>함께 하세요!</strong>
                        <p>지머는 고객에게 새로운 세상을 전달하고, <br/>좋은 시너지를 위해 다양한 제휴 문의를 받습니다.</p>
                        <button type="button" className="btn_style2" onClick={()=>dispatch(inquirePop(true))}>
                            <span>제휴문의하기</span>
                        </button>
                    </div>
                    <div className="img_section_con">
                        <div className="img">
                            <img src={img_hospital1} alt="이미지"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Hospital;
