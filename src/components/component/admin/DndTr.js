import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { enum_api_uri } from '../../../config/enum';
import { adminBannerPop } from '../../../store/popupSlice';

const DndTr = ({data, id, onCheckHandler, colgroup, popType}) => {
    const common = useSelector((state)=>state.common);
    const etc = useSelector((state)=>state.etc);
    const dispatch = useDispatch();
    const api_uri = enum_api_uri.api_uri;
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isSorting
    } = useSortable({id: id});
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isSorting ? transition : undefined,
        zIndex: isDragging ? '100' : undefined,
        background: '#fff'
    };


    return(
        <td
            style={style} 
            ref={setNodeRef} 
            colSpan={7}
        >
            <div className='flex'>
                <div style={{'width':colgroup[0]}}>
                    <div className="chk_box2">
                        <input type="checkbox" id={`check_${data.idx}`} className="blind"
                            value={data.idx}
                            onChange={(e) => {
                                const isChecked = e.currentTarget.checked;
                                const value = e.currentTarget.value;
                                onCheckHandler(isChecked, value);
                            }}
                            checked={etc.checkedList.includes(data.idx)}
                        />
                        <label htmlFor={`check_${data.idx}`}>선택</label>
                    </div>
                </div>
                <div style={{'width':colgroup[1]}}>
                    <div className="img_box">
                        {data.b_file && <img src={api_uri+data.b_file} alt="썸네일이미지" />
                            // data.b_c_type[0] == '1' ? <img src={api_uri+data.b_file} alt="썸네일이미지" />
                            // :data.b_c_type[0] == '2' && <video src={api_uri+data.b_file} />
                        }
                    </div>
                </div>
                <div style={{'width':colgroup[2]}}>
                    <button type="button" className="link" 
                        onClick={()=>{
                            dispatch(adminBannerPop({adminBannerPop:true,adminBannerPopIdx:data.idx,adminBannerPopType:popType}));
                        }}>{data.b_title}</button>
                </div>
                <div style={{'width':colgroup[3]}}>{data.b_s_date}{data.b_e_date && " ~ "+data.b_e_date}</div>
                <div style={{'width':colgroup[4]}}>커버</div>
                <div style={{'width':colgroup[5]}}>
                    <em className={data.b_open[0] == "Y" ? "txt_color1" : "txt_color2"}>{data.b_open[1]}</em>
                </div>
                <div style={{'width':colgroup[6]}}><button type="button" className="btn_move" {...attributes} {...listeners}>카테고리 이동</button></div>
            </div>
        </td>
    );
};

export default DndTr;