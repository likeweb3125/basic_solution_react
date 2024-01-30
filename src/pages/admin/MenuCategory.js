import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop, adminCategoryPop, adminSubCategoryPop, adminCategoryPopModify } from "../../store/popupSlice";
import { menuCheckList, unMenuCheckList, currentMenuId } from "../../store/etcSlice";
import arrow_open from "../../images/arrow_open.svg";
import TableWrap from "../../components/component/admin/TableWrap";
import ConfirmPop from "../../components/popup/ConfirmPop";


const MenuCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menu_list = enum_api_uri.menu_list;
    const popup = useSelector((state)=>state.popup);
    const user = useSelector((state)=>state.user);
    const etc = useSelector((state)=>state.etc);
    const [confirm, setConfirm] = useState(false);
    const [menuList, setMenuList] = useState([]);
    const [unusedMenuList, setUnusedMenuList] = useState([]);
    const [currentMenu, setCurrentMenu] = useState({});
    const [menuOn, setMenuOn] = useState(null);
    const [unMenuOn, setUnMenuOn] = useState(false);
    const [checkList, setCheckList] = useState([]);
    const [unCheckList, setUnCheckList] = useState([]);
    const [checkedNum, setCheckedNum] = useState(0);
    const [unCheckedNum, setUnCheckedNum] = useState(0);
    const [parents, setParents] = useState([]);


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);

    
    // 전체카테고리 가져오기
    const getMenuList = () => {
        axios.get(menu_list,
            {headers:{Authorization: `Bearer ${user.loginUser.accessToken}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                const data = res.data.data;
                const list = data.filter(item => item.id != 0); //미사용카테고리 제외
                const menuListWithCount = list.map((cont, i) => {
                    const totalSubMenuCount = getMenuCount(cont);
                    return {
                        ...cont,
                        totalSubMenuCount,
                    };
                });
                setMenuList(menuListWithCount);

                const unList = data.find(item => item.id == 0); //미사용카테고리
                setUnusedMenuList(unList.submenu);
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            if(error.response.status === 401){//토큰에러시 관리자단 로그인페이지로 이동
                navigate("/console/login");
            }else{
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt: err_msg,
                    confirmPopBtn:1,
                }));
                setConfirm(true);
            }
        });
    };
    

    //맨처음 전체카테고리 가져오기
    useEffect(()=>{
        getMenuList();
    },[]);


    //카테고리수정시 전체카테고리 가져오기
    useEffect(()=>{
        if(popup.adminCategoryPopModify){
            dispatch(adminCategoryPopModify(false));

            getMenuList();
        }
    },[popup.adminCategoryPopModify]);


    useEffect(()=>{
        if(menuList.length > 0){
            const id = menuList[0].id;
            onMenuClickHandler(id);
        }
    },[menuList]);


    //하위카테고리 총 개수 구하기
    const getMenuCount = (menu) => {
        let count = 0;
      
        if (menu.submenu && menu.submenu.length > 0) {
            count += menu.submenu.length; // 현재 레벨의 submenu 개수
        
            // 재귀적으로 하위 메뉴의 개수를 더함
            menu.submenu.forEach((subMenu) => {
                count += getMenuCount(subMenu);
            });
        }
      
        return count;
    };


    //맨처음 메뉴리스트 id값만 배열로 (전체 체크박스리스트 만들기)
    useEffect(()=>{
        console.log(currentMenu);

        let list = [];
        if(currentMenu.submenu){
            list = currentMenu.submenu.map((item) => item.id).filter(Boolean);
        }
        setCheckList([...list]);

        
        //선택된 1차 카테고리값 (currentMenu) 변경시 체크리스트값 빈배열로 변경 
        dispatch(menuCheckList([]));


        //현재선택된 부모메뉴 리스트
        if(currentMenu.parents){
            setParents(currentMenu.parents);
        }else{
            setParents([]);
        }
        
    },[currentMenu]);

    //맨처음 미사용메뉴리스트 id값만 배열로 (전체 체크박스리스트 만들기)
    useEffect(()=>{
        let list = [];
        if(unusedMenuList.length > 0){
            list = unusedMenuList.map((item) => item.id).filter(Boolean);
        }
        setUnCheckList([...list]);
    },[unusedMenuList]);


    //메뉴 전체선택 체크박스 체크시
    const allCheckHandler = (checked) => {
        if(checked){
            dispatch(menuCheckList([...checkList]));
        }else{
            dispatch(menuCheckList([]));
        }
    };

    //미사용메뉴 전체선택 체크박스 체크시
    const allUnMenuCheckHandler = (checked) => {
        if(checked){
            dispatch(unMenuCheckList([...unCheckList]));
        }else{
            dispatch(unMenuCheckList([]));
        }
    };


    //메뉴 체크박스 변경시 체크된 수 변경
    useEffect(()=>{
        const num = etc.menuCheckList.length;
        setCheckedNum(num);
    },[etc.menuCheckList]);

    //미사용메뉴 체크박스 변경시 체크된 수 변경
    useEffect(()=>{
        const num = etc.unMenuCheckList.length;
        setUnCheckedNum(num);
    },[etc.unMenuCheckList]);


    //1차 카테고리 클릭시
    const onMenuClickHandler = (id) => {
        function findItemById(menu, targetId) {
            for (const item of menu) {
                if (item.id === targetId) {
                    return item;
                }
            
                if (item.submenu) {
                    const subItem = findItemById(item.submenu, targetId);
                    if (subItem) {
                        return subItem;
                    }
                }
            }
          
            return null;
        }
        const data = findItemById(menuList, id);

        setCurrentMenu({...data});
    };


    //선택된 메뉴값 찾기
    function findItemByIdAndTopParents(menu, targetId) {
        let resultItem = null;

        function findRecursively(currentItem, parents = []) {
            if (currentItem.id === targetId) {
                const totalSubMenuCount = getMenuCount(currentItem);
                resultItem = { ...currentItem, parents, totalSubMenuCount };
                return;
            }

            if (currentItem.submenu) {
                for (const subItem of currentItem.submenu) {
                    const totalSubMenuCount = getMenuCount(currentItem);
                    findRecursively(subItem, [...parents, { ...currentItem, submenu: null, totalSubMenuCount }]);
                }
            }
        }

        for (const item of menu) {
            findRecursively(item);
        }

        return resultItem;
    }


    //현재선택된 카테고리값이 바뀔시
    useEffect(()=>{
        const id = etc.currentMenuId;
        if(id){
            const foundItem = findItemByIdAndTopParents(menuList, id);
            setCurrentMenu({...foundItem});
        }else{
            setCurrentMenu({});
        }
    },[etc.currentMenuId]);


    //하위카테고리 부모카테고리 리스트값 변경시 최고부모 1차카테고리값 찾기
    useEffect(()=>{
        if(parents.length > 0){
            const idList = parents.map((item)=>item.id);
            setMenuOn(idList[0]);
        }else{
            setMenuOn(currentMenu.id);
        }
    },[parents]);


    return(<>
        <div className="page_admin_category">
            <div className="content_box">
                <div className="flex_between">
                    <div className="tit">
                        <h3><b>1차 카테고리</b><strong>총 {CF.MakeIntComma(menuList.length)}개</strong></h3>
                    </div>
                    <div className="flex">
                        {menuOn && //현재 선택된카테고리가 있을때만 노출
                            <button type="button" className="btn_type12"
                                onClick={()=>{
                                    dispatch(adminCategoryPop({adminCategoryPop:true, adminCategoryPopIdx:menuOn}));
                                }}
                            >선택한 카테고리 관리</button>
                        }
                        <button type="button" className="btn_type5 lm8"
                            onClick={()=>{
                                dispatch(adminCategoryPop({adminCategoryPop:true, adminCategoryPopIdx:null}));
                            }}
                        >1차 카테고리 추가</button>
                    </div>
                </div>
                <div className="menu_box">
                    <ul className="flex_wrap">
                        {menuList.map((cont,i)=>{
                            return(
                                <li key={i} 
                                    onClick={()=>{onMenuClickHandler(cont.id)}}
                                    className={menuOn === cont.id ? 'on' : ''}
                                >
                                    <strong>{cont.c_name}</strong><span>({CF.MakeIntComma(cont.totalSubMenuCount)})</span>
                                </li> 
                            );
                        })}
                    </ul>
                </div>
            </div>
            {Object.keys(currentMenu).length > 0 &&
                <div className="content_box">
                    <div className="flex_between">
                        <ul className="location_ul flex_wrap"> 
                            <li>홈</li>
                            {parents.map((cont,i)=>{
                                return(
                                    <li key={i}>
                                        <button type="button"
                                            onClick={()=>{
                                                dispatch(currentMenuId(cont.id));
                                            }}
                                        >
                                            <strong>{cont.c_name}</strong><span>({CF.MakeIntComma(cont.totalSubMenuCount)})</span>
                                        </button>
                                    </li>
                                );
                            })}
                            <li className="on">
                                <button type="button">
                                    <strong>{currentMenu.c_name}</strong><span>({CF.MakeIntComma(currentMenu.totalSubMenuCount)})</span>
                                </button>
                            </li>
                        </ul>
                        <div className="flex">
                            {parents.length > 0 && //현재선택된 카테고리가 하위카테고리일때만 노출
                                <button type="button" className="btn_type12"
                                    onClick={()=>{
                                        dispatch(adminSubCategoryPop({adminSubCategoryPop:true,adminSubCategoryPopIdx:currentMenu.id}));
                                    }}
                                >선택한 카테고리 관리</button>
                            }
                            {currentMenu.c_depth !== 3 && //현재선택된 카테고리가 3차 카테고리일때는 미노출 (하위카테고리 최대 3차까지만 생성가능)
                                <button type="button" className="btn_type6 lm8"
                                    onClick={()=>{
                                        dispatch(adminSubCategoryPop({adminSubCategoryPop:true, adminSubCategoryPopIdx:null}));
                                    }}
                                >하위 카테고리 등록</button>
                            }
                        </div>
                    </div>
                    <div className="board_section">
                        <div className="board_table_util">
                            <div className="chk_area">
                                <div className="chk_box2">
                                    <input type="checkbox" id="chkAll" className="blind"
                                        onChange={(e)=>{allCheckHandler(e.currentTarget.checked)}} 
                                        checked={checkList.length > 0 && checkList.length === etc.menuCheckList.length && checkList.every(item => etc.menuCheckList.includes(item))}
                                    />
                                    <label htmlFor="chkAll">전체선택</label>
                                </div>
                            </div>
                            <div className="util_wrap">
                                <span>선택한 카테고리</span>
                                <span>총 <b>{CF.MakeIntComma(checkedNum)}</b>개</span>
                                <button type="button" className="btn_type10">해제</button>
                            </div>
                            <div className="util_right">
                                <button type="button" className="btn_type9">삭제</button>
                            </div>
                        </div>
                        <TableWrap 
                            class="tbl_wrap1 tbl_wrap1_1"
                            colgroup={["6%","9%","40%","10%","15%","10%","10%"]}
                            thList={["","순서","메뉴명","하위","컨텐츠유형","매핑 해제","순서"]}
                            tdList={currentMenu.submenu}
                            type={"submenu"}
                        />
                    </div>
                </div>
            }
            <div className="content_box">
                <div className="flex_between">
                    <div className="tit">
                        <h3><b>미설정 목록</b><strong>총 {CF.MakeIntComma(unusedMenuList.length)}개</strong></h3>
                    </div>
                    <button type="button" 
                        className={`btn_open${unMenuOn ? ' on' : ''}`}
                        onClick={()=>setUnMenuOn(!unMenuOn)}
                    ><img src={arrow_open} alt="화살표 아이콘" /><span>미설정 목록 열기</span></button>
                </div>
                {unMenuOn &&
                    <div className="board_section">
                        <div className="board_table_util">
                            <div className="chk_area">
                                <div className="chk_box2">
                                    <input type="checkbox" id="unChkAll" className="blind"
                                        onChange={(e)=>{allUnMenuCheckHandler(e.currentTarget.checked)}} 
                                        checked={unCheckList.length > 0 && unCheckList.length === etc.unMenuCheckList.length && unCheckList.every(item => etc.unMenuCheckList.includes(item))}
                                    />
                                    <label htmlFor="unChkAll">전체선택</label>
                                </div>
                            </div>
                            <div className="util_wrap">
                                <span>선택한 카테고리</span>
                                <span>총 <b>{CF.MakeIntComma(unCheckedNum)}</b>개</span>
                                <button type="button" className="btn_type8">매핑</button>
                            </div>
                            <div className="util_right">
                                <button type="button" className="btn_type9">삭제</button>
                            </div>
                        </div>
                        <TableWrap 
                            class="tbl_wrap1 tbl_wrap1_1"
                            colgroup={["6%","9%","40%","10%","15%","10%","10%"]}
                            thList={["","순서","메뉴명","하위","컨텐츠유형","매핑 해제","순서"]}
                            tdList={unusedMenuList}
                            type={"submenu"}
                            unMenu={true}
                        />
                    </div>
                }
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default MenuCategory;
