import { useEffect, useState } from "react";
// import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
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
    useSortable,
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import MenuDepth2 from "./MenuDepth2";

const MenuDepth1 = (props) => {
    const [data, setData] = useState({});
    const [li2Classes, setLi2Classes] = useState({});
    const [menuIdList, setMenuIdList] = useState([]);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isSorting,
    } = useSortable({id: props.id});
    
    const style = {
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition: isSorting ? transition : undefined,
        zIndex: isDragging ? '100' : undefined,
    };

    
    useEffect(()=>{
        setData(props.data);
        // console.log(props.data);

        const idList = props.data.list.map((menu) => menu.id);
        setMenuIdList(idList);
    },[props.data]);


    useEffect(()=>{
        const idx = props.liOnIdx;

        // index-로 시작하는 모든 키를 false로 설정합니다.
        const updatedClasses = { ...li2Classes };
        for (let key in updatedClasses) {
            if (key.startsWith(`${idx}-`)) {
                updatedClasses[key] = false;
            }
        }
    
        // 변경된 li2Classes를 설정합니다.
        setLi2Classes(updatedClasses);
    },[props.liOnIdx]);
    
    

    //2뎁스 메뉴토글버튼 클릭시
    const liFolderHandler = (index) => {
        // 버튼을 클릭하면 해당 인덱스의 li2Classes 상태를 토글합니다.
        setLi2Classes((prevClasses) => ({
            ...prevClasses,
            [index]: !prevClasses[index], // 토글
        }));
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
        // console.log(event)
        
        // if (active.id !== over.id && over.id !== "unusedMenu") {
        //     setList((items) => {
        //         const oldIndex = items.findIndex((item) => item.id === active.id);
        //         const newIndex = items.findIndex((item) => item.id === over.id);

        //         return arrayMove(items, oldIndex, newIndex);
        //     });
        // }
        // setAssiDnd(true);
        // setAssiDndEnd(true);
    }



    return(
        <li style={style}
            ref={setNodeRef}
            className={props.isLiOn}
            id={props.id}
        >
            <div className="menu">
                <span>{data && data.name}{data && data.list && data.list.length > 0 && " ("+data.list.length+")"}</span>
                <div className="btn_wrap">
                    <button type="button" className="btn_add">하위 카테고리 등록</button>
                    <button type="button" className="btn_folder" onClick={props.liFolderBtnClickHandler}>하위 카테고리 열고 닫기</button>
                    <button type="button" className="btn_move" {...attributes} {...listeners}>카테고리 이동</button>
                </div>
            </div>
            <ul className="list_menu2">
                {/* <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                > */}
                    <SortableContext
                        items={menuIdList}
                        strategy={verticalListSortingStrategy}
                    >
                        {data && data.list && data.list.length > 0 ?
                            data.list.map((depth2,i)=>{
                                const isLiOn = li2Classes[`${props.idx}_${i}`] ? 'on' : '';

                                return(
                                    <MenuDepth2 
                                        key={i}
                                        data={depth2}
                                        idx={i}
                                        liFolderBtnClickHandler={()=>{liFolderHandler(`${props.idx}_${i}`)}}
                                        id={`depth2_${props.idx}_${i}`}
                                        isLiOn={isLiOn}
                                    />
                                    // <li key={i} className={isLiOn}>
                                    //     <div className="menu">
                                    //         <span>{depth2.name}</span>
                                    //         <div className="btn_wrap">
                                    //             <button type="button" className="btn_add">하위 카테고리 등록</button>
                                    //             <button type="button" className="btn_folder" onClick={() => li2FolderHandler(`${props.idx}-${i}`)}>하위 카테고리 열고 닫기</button>
                                    //             <button type="button" className="btn_move">카테고리 이동</button>
                                    //         </div>
                                    //     </div>
                                    //     <ul className="list_menu3">
                                    //         {depth2.list.length > 0 ?
                                    //             depth2.list.map((depth3,i)=>{
                                    //                 return(
                                    //                     <li key={i}>
                                    //                         <div className="menu">
                                    //                             <span>{depth3.name}</span>
                                    //                             <div className="btn_wrap">
                                    //                                 <button type="button" className="btn_move">카테고리 이동</button>
                                    //                             </div>
                                    //                         </div>
                                    //                     </li>
                                    //                 );
                                    //             })
                                    //             : <li className="none_category">카테고리가 없습니다.</li>
                                    //         }
                                    //     </ul>
                                    // </li>
                                );
                            })
                            : <li className="none_category">카테고리가 없습니다.</li>
                        }
                    </SortableContext>
                {/* </DndContext> */}
            </ul>
        </li>
    );
};

export default MenuDepth1;