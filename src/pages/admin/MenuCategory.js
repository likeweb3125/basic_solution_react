import { useEffect, useState } from "react";

import MenuListBox from "../../components/component/admin/MenuListBox";


const MenuCategory = () => {
    const [menuList, setMenuList] = useState([
        {   name:"About Us",
            list:[
                {   name:"회사소개 2depth",
                    list:[{name:"회사소개1 3depth"},{name:"회사소개2 3depth"}]
                },
                {   name:"회사비전 2depth",
                    list:[]
                },
            ]
        },
        {   name:"Service",
            list:[
                {   name:"서비스 2depth",
                    list:[]
                },
                {   name:"서비스2 2depth",
                    list:[{name:"서비스2-1 3depth"},{name:"서비스2-2 3depth"}]
                },
            ]
        },
    ]);
    const [unusedMenuList, setUnusedMenuList] = useState([
        {   
            list:[{name:"서비스2-1 3depth"},{name:"서비스2-2 3depth"}]
        },
        {   
            list:[{name:"서비스2-1 3depth"},{name:"서비스2-2 3depth"}]
        },
    ]);

    // useEffect(()=>{
    //     const newList = menuList.map((menu, index) => `menu${index + 1}`);
    //     console.log(newList);
    // },[]);


    useEffect(()=>{
        const menuListWithIds = menuList.map((menu, menuIndex) => ({
            ...menu,
            id: `depth1_${menuIndex}`,
            list: menu.list.map((depth2, depth2Index) => ({
                ...depth2,
                id: `depth2_${menuIndex}_${depth2Index}`,
                list: depth2.list.map((depth3, depth3Index) => ({
                    ...depth3,
                    id: `depth3_${menuIndex}_${depth2Index}_${depth3Index}`,
                })),
            })),
        }));

        setMenuList(menuListWithIds);

    },[]);

    return(
        <div className="page_admin_menu">
            <div className="content_box">
                <div className="tit">
                    <h3><b>전체 카테고리</b></h3>
                    <ul className="list_category_txt">
                        <li>
                            <span>1차 카테고리</span>
                            <strong>총 4개</strong>
                        </li>
                        <li>
                            <span>2차 카테고리</span>
                            <strong>총 10개</strong>
                        </li>
                    </ul>
                </div>
                <div className="menu_box">
                    <div className="menu_list_wrap">
                        <div className="btn_util">
                            <div className="add_wrap">
                                <button type="button" className="btn_type5">1차 카테고리 추가</button>
                                <button type="button" className="btn_type6">하위 카테고리 등록</button>
                            </div>
                            <button type="button" className="btn_type7">삭제</button>
                        </div>
                        <div className="menu_list_box">
                            <MenuListBox 
                                list={menuList}
                                unusedList={unusedMenuList}
                            />
                            <p>* 드래그앤드랍으로 카테고리 순서를 변경할 수 있습니다.<br/>* 드래그앤드랍으로 하위 카테고리는 상위 카테고리 추가 및 미사용 카테고리로 등록할 수 있습니다.</p>
                        </div>
                        <div className="btn_util">
                            <div className="add_wrap">
                                <button type="button" className="btn_type5">1차 카테고리 추가</button>
                                <button type="button" className="btn_type6">하위 카테고리 등록</button>
                            </div>
                            <button type="button" className="btn_type7">삭제</button>
                        </div>
                    </div>
                    {/* 1차 카테고리 등록 섹션 */}
                    <div className="reg_category_wrap">
                        <h4>1차 카테고리</h4>
                        <div className="page_form">
                            <form action="">
                                <fieldset>
                                    <legend>1차 카테고리 등록 폼</legend>
                                    <div className="form_inner">
                                        <div className="form_box form_border_box">
                                            <div className="form_input">
                                                <h6>카테고리명 <i>*</i></h6>
                                                <div className="input_wrap">
                                                    <div className="input_box">
                                                        <div className="char_cnt">
                                                            <b>8</b> / 16
                                                        </div>
                                                        <input type="text" placeholder="카테고리명을 입력해주세요."/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form_input">
                                                <h6>서브 메인 배너</h6>
                                                <div className="input_wrap">
                                                    <div className="chk_rdo_wrap">
                                                        <div className="rdo_box1">
                                                            <input type="radio" id="rdo11" className="blind" checked/>
                                                            <label htmlFor="rdo11">원본 사이즈 고정</label>
                                                        </div>
                                                        <div className="rdo_box1">
                                                            <input type="radio" id="rdo12" className="blind"/>
                                                            <label htmlFor="rdo12">커버</label>
                                                        </div>
                                                    </div>
                                                    <div className="file_box1">
                                                        <div className="input_file">
                                                            <input type="file" id="file11" className="blind"/>
                                                            <label htmlFor="file11">
                                                                <b>파일을 마우스로 끌어 오세요.</b>
                                                                <strong>파일선택</strong>
                                                            </label>
                                                        </div>
                                                        <ul className="file_txt">
                                                            <li>
                                                                <span>이미지.JPG</span>
                                                                <button type="button" className="btn_file_remove">파일삭제</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <em className="txt_input">* 권장 : 1800 * 320 px</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form_box">
                                            <div className="form_input">
                                                <h6>메뉴 UI <i>*</i></h6>
                                                <div className="input_wrap">
                                                    <div className="chk_rdo_wrap">
                                                        <div className="rdo_box1">
                                                            <input type="radio" id="rdo21" className="blind"/>
                                                            <label htmlFor="rdo21">텍스트</label>
                                                        </div>
                                                        <div className="rdo_box1">
                                                            <input type="radio" id="rdo22" className="blind" checked/>
                                                            <label htmlFor="rdo22">이미지</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form_input">
                                                <h6>메뉴 이미지 ON</h6>
                                                <div className="input_wrap">
                                                    <div className="file_box1">
                                                        <div className="input_file">
                                                            <input type="file" id="file2" className="blind"/>
                                                            <label htmlFor="file2">
                                                                <b>파일을 마우스로 끌어 오세요.</b>
                                                                <strong>파일선택</strong>
                                                            </label>
                                                        </div>
                                                        <ul className="file_txt">
                                                            <li>
                                                                <span>이미지.JPG</span>
                                                                <button type="button" className="btn_file_remove">파일삭제</button>
                                                            </li>
                                                        </ul>
                                                        <div className="view_file_img">
                                                            <div className="file_img">
                                                                <img src="images/test1.png" alt="image"/>
                                                                <button type="button" className="btn_img_remove">이미지 삭제</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form_input">
                                                <h6>메뉴 이미지 OFF</h6>
                                                <div className="input_wrap">
                                                    <div className="file_box1">
                                                        <div className="input_file">
                                                            <input type="file" id="file2" className="blind"/>
                                                            <label htmlFor="file2">
                                                                <b>파일을 마우스로 끌어 오세요.</b>
                                                                <strong>파일선택</strong>
                                                            </label>
                                                        </div>
                                                        <ul className="file_txt">
                                                            <li>
                                                                <span>이미지.JPG</span>
                                                                <button type="button" className="btn_file_remove">파일삭제</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_btn_wrap">
                                        <button type="button" className="btn_type1">취소</button>
                                        <button type="button" className="btn_type2">등록</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    {/* //1차 카테고리 등록 섹션 */}
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;