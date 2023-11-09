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
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import MenuDepth1 from "./MenuDepth1";
import UnusedMenu from "./UnusedMenu";


const MenuListBox = (props) => {
    const [list, setList] = useState([]);
    const [liClasses, setLiClasses] = useState({});
    const [li2Classes, setLi2Classes] = useState({});
    const [unusedList, setUnusedList] = useState([]);
    const [unusedMenu, setUnusedMenu] = useState(0);
    const [unusedMenuOn, setUnusedMenuOn] = useState(false);

    const [menuIdList, setMenuIdList] = useState([]);

    const [assiDnd, setAssiDnd] = useState(false);
    const [assiDndEnd, setAssiDndEnd] = useState(false);


    const [liOnIdx, setLiOnIdx] = useState(null);


    // 메뉴 카테고리 리스트
    useEffect(()=>{
        setList(props.list);
        // console.log(props.list);

        const idList = props.list.map((menu) => menu.id);
        // idList.unshift("menu0");

        setMenuIdList(idList);
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

        setLiOnIdx(index);
      
        // // index-로 시작하는 모든 키를 false로 설정합니다.
        // const updatedClasses = { ...li2Classes };
        // for (let key in updatedClasses) {
        //     if (key.startsWith(`${index}-`)) {
        //         updatedClasses[key] = false;
        //     }
        // }
      
        // // 변경된 li2Classes를 설정합니다.
        // setLi2Classes(updatedClasses);
    };



    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
              distance: 5,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
              distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );


    const handleDragStart = () => {
        // console.log('dnd 시작');

    };


    const handleDragEnd = (event) => {
        const {active, over} = event;
        console.log(event)
        
        // if(active.id.includes("depth1_") && over.id.includes("depth1_")){

        
        if (active.id !== over.id) {
            setList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setAssiDnd(true);
        setAssiDndEnd(true);
    // }
    }
    


    return(<>
        <ul className="list_menu1">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={list.map((menu) => menu.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {list.map((cont,idx)=>{
                        const isLiOn = liClasses[idx] ? 'on' : '';

                        return(
                            <MenuDepth1 
                                key={idx}
                                data={cont}
                                idx={idx}
                                liFolderBtnClickHandler={()=>{liFolderHandler(idx)}}
                                id={`depth1_${idx}`}
                                isLiOn={isLiOn}
                                liOnIdx={liOnIdx}
                            />
                        );
                    })}
                </SortableContext>
                

                    {/* 미사용 카테고리 */}
                    <UnusedMenu 
                        data={unusedList}
                        id={"unusedMenu"}
                    />
                    {/* <li className={`disable_menu_wrap${unusedMenuOn ? " on" : ""}`} id="menu0">
                        <button type="button" 
                            className="btn_disable_menu"
                            onClick={()=>{setUnusedMenuOn(!unusedMenuOn)}}
                        >미사용 카테고리{unusedMenu > 0 && "("+unusedMenu+")"}</button>
                        <div className="disable_menu">
                            {unusedMenu > 0 ?
                                <SortableContext items={["menu0"]} id="menu0">
                                    <ul className="list_disable_menu">
                                        {unusedList[0].list.map((cont,i)=>{
                                            return(
                                                <li key={i}>
                                                    <div className="menu menu1">
                                                        <span>{cont.name}</span>
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
                                                        <span>{cont.name}</span>
                                                        <div className="btn_wrap">
                                                            <button type="button" className="btn_move">카테고리 이동</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </SortableContext>
                                : <div className="none_category">카테고리가 없습니다.</div>
                            }
                        </div>
                    </li> */}
                


                
            </DndContext>

           
        </ul>
    </>);
};

export default MenuListBox;