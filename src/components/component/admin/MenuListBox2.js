import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    MouseSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';


const MenuListBox = (props) => {
    const [list, setList] = useState([]);
    const [liClasses, setLiClasses] = useState({});
    const [li2Classes, setLi2Classes] = useState({});
    const [unusedList, setUnusedList] = useState([]);
    const [unusedMenu, setUnusedMenu] = useState(0);
    const [unusedMenuOn, setUnusedMenuOn] = useState(false);


    // 메뉴 카테고리 리스트
    useEffect(()=>{
        setList(props.list);
    },[props.list]);


    //미사용 카테고리 리스트
    useEffect(()=>{
        setUnusedList(props.unusedList);

        // 미사용카테고리 개수
        const num = props.unusedList[0].list.length + props.unusedList[1].list.length;
        setUnusedMenu(num);
    },[props.unusedList]);


    //1뎁스 메뉴토글버튼 클릭시
    const liFolderHandler = (index) => {
        // 버튼을 클릭하면 해당 인덱스의 liClasses 상태를 토글합니다.
        setLiClasses((prevClasses) => ({
            ...prevClasses,
            [index]: !prevClasses[index], // 토글
        }));
      
        // index-로 시작하는 모든 키를 false로 설정합니다.
        const updatedClasses = { ...li2Classes };
        for (let key in updatedClasses) {
            if (key.startsWith(`${index}-`)) {
                updatedClasses[key] = false;
            }
        }
      
        // 변경된 li2Classes를 설정합니다.
        setLi2Classes(updatedClasses);
    };


    //2뎁스 메뉴토글버튼 클릭시
    const li2FolderHandler = (index) => {
        // 버튼을 클릭하면 해당 인덱스의 li2Classes 상태를 토글합니다.
        setLi2Classes((prevClasses) => ({
            ...prevClasses,
            [index]: !prevClasses[index], // 토글
        }));
    };





    return(<>
        {/* 메뉴 카테고리 */}
        <ul className="list_menu1">
            {list && list.map((cont,idx)=>{
                const isLiOn = liClasses[idx] ? 'on' : '';

                return(
                    <li key={idx} className={isLiOn}>
                        <div className="menu">
                            <span>{cont.name}{cont.list.length > 0 && "("+cont.list.length+")"}</span>
                            <div className="btn_wrap">
                                <button type="button" className="btn_add">하위 카테고리 등록</button>
                                <button type="button" className="btn_folder" onClick={() => liFolderHandler(idx)}>하위 카테고리 열고 닫기</button>
                                <button type="button" className="btn_move">카테고리 이동</button>
                            </div>
                        </div>
                        <ul className="list_menu2">
                            {cont.list.length > 0 ?
                                cont.list.map((depth2,i)=>{
                                    const isLiOn = li2Classes[`${idx}-${i}`] ? 'on' : '';

                                    return(
                                        <li key={i} className={isLiOn}>
                                            <div className="menu">
                                                <span>{depth2.name}</span>
                                                <div className="btn_wrap">
                                                    <button type="button" className="btn_add">하위 카테고리 등s록</button>
                                                    <button type="button" className="btn_folder" onClick={() => li2FolderHandler(`${idx}-${i}`)}>하위 카테고리 열고 닫기</button>
                                                    <button type="button" className="btn_move">카테고리 이동</button>
                                                </div>
                                            </div>
                                            <ul className="list_menu3">
                                                {depth2.list.length > 0 ?
                                                    depth2.list.map((depth3,i)=>{
                                                        return(
                                                            <li key={i}>
                                                                <div className="menu">
                                                                    <span>{depth3}</span>
                                                                    <div className="btn_wrap">
                                                                        <button type="button" className="btn_move">카테고리 이동</button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })
                                                    : <li className="none_category">카테고리가 없습니다.</li>
                                                }
                                            </ul>
                                        </li>
                                    );
                                })
                                : <li className="none_category">카테고리가 없습니다.</li>
                            }
                        </ul>
                    </li>
                );
            })}
        </ul>

        {/* 미사용 카테고리 */}
        <div className={`disable_menu_wrap${unusedMenuOn ? " on" : ""}`}>
            <button type="button" 
                className="btn_disable_menu"
                onClick={()=>{setUnusedMenuOn(!unusedMenuOn)}}
            >미사용 카테고리{unusedMenu > 0 && "("+unusedMenu+")"}</button>
            <div className="disable_menu">
                {unusedMenu > 0 ?
                    <ul className="list_disable_menu">
                        {unusedList[0].list.map((cont,i)=>{
                            return(
                                <li key={i}>
                                    <div className="menu menu1">
                                        <span>{cont}</span>
                                        <div className="btn_wrap">
                                            <button type="button" className="btn_move">카테고리 이동</button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                        {unusedList[1].list.map((cont,i)=>{
                            return(
                                <li key={i}>
                                    <div className="menu menu2">
                                        <span>{cont}</span>
                                        <div className="btn_wrap">
                                            <button type="button" className="btn_move">카테고리 이동</button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    : <div className="none_category">카테고리가 없습니다.</div>
                }
            </div>
            
        </div>
    </>);
};

export default MenuListBox;