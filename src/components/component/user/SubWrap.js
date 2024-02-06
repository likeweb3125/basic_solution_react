import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SubVisual from "./SubVisual";


const SubWrap = () => {
    const common = useSelector((state)=>state.common);
    const { menu_id } = useParams();
    const [menuList, setMenuList] = useState([]);
    const [bannerData, setBannerData] = useState({});


    useEffect(()=>{
        setMenuList(common.headerMenuList);
    },[common.headerMenuList]);


    useEffect(() => {
        const result = findObjectByIdWithDepthCheck(menuList, menu_id);
        if(result){
            const data = {
                c_main_banner: result.c_main_banner ?? result.c_main_banner,
                c_main_banner_file: result.c_main_banner_file ?? result.c_main_banner_file,
            };
            setBannerData(data);
        }
        
    }, [menu_id, menuList]);


    function findObjectByIdWithDepthCheck(list, targetId) {
        const findRecursive = (items) => {
            for (const item of items) {
                if (item.id == targetId) {
                    // 찾은 객체의 c_depth가 1이면 현재 객체 반환
                    if (item.c_depth === 1) {
                        return item;
                    } else if (item.c_depth > 1) {
                        // c_depth가 1보다 크면 부모의 객체를 찾기 위해 재귀 호출
                        const parent = findObjectByIdWithDepthCheck(list, item.c_depth_parent);
                        return parent || item; // 부모를 찾은 경우 부모를 반환, 못 찾은 경우 현재 객체 반환
                    }
                }
    
                // 현재 객체의 submenu에 대해 재귀 호출
                const found = findRecursive(item.submenu || []);
                if (found) {
                    return found;
                }
            }
    
            return null; // 찾지 못한 경우
        };
    
        return findRecursive(list);
    }



    return(<>
        <SubVisual 
            imgData={bannerData}
            list={['게시판','공지사항']}
        />
    </>);
};

export default SubWrap;