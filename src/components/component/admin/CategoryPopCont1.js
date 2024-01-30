import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSubCategoryPopData } from "../../../store/popupSlice";
import Editor from "../Editor";


const CategoryPopCont1 = (props) => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState({});
    const [tabList, setTabList] = useState(["CH에디터","Textarea"]);
    const [tab, setTab] = useState(1);
    const [content, setContent] = useState("");
    const [showRaw, setShowRaw] = useState(false);
    const [rawHtml, setRawHtml] = useState('');
    const [templateText, setTemplateText] = useState("");


    useEffect(()=>{
        setInfo(props.info);
        // setContent(props.info.b_template_text);
    },[props.info]);


    useEffect(()=>{
        //카테고리 값 변경시 adminSubCategoryPopData store 에 저장
        dispatch(adminSubCategoryPopData(info));
    },[info]);


    //에디터내용 값
    const onEditorChangeHandler = (e) => {
        setContent(e);
        
    };


    //에디터 HTML 버튼클릭시 textarea 보이기
    const handleClickShowRaw = () => {
        setShowRaw(!showRaw);
    };


    //에디터 HTML 버튼 토글
    useEffect(()=>{
        if (showRaw) {
            setRawHtml(content);
        }else {
            setContent(rawHtml);
        }
    },[showRaw]);



    return(
        <div className="tab_con tab_con1">
            <ul className="tab_type2">
                {tabList.map((cont,i)=>{
                    return(
                        <li key={i} className={tab === i+1 ? "on" : ""}>
                            <button type="button" onClick={()=>setTab(i+1)}>{cont}</button>
                        </li>
                    );
                })}
            </ul>
            <div className="tab_inner">
                {tab === 1 ?
                    <div className="edit_box">
                        <Editor 
                            value={content}
                            onChangeHandler={onEditorChangeHandler}
                            onClickRaw={handleClickShowRaw}
                            btnHtmlOn={showRaw}
                        />
                        {showRaw ? 
                            <textarea
                                value={rawHtml}
                                onChange={(e) => {
                                    setRawHtml(e.target.value);
                                    
                                }}
                                className="raw_editor"
                            />
                            : null  
                        }
                    </div>
                    :<textarea 
                        style={{height:"350px"}}
                        value={templateText || ""}
                        onChange={(e)=>setTemplateText(e.currentTarget.value)}
                    />
                }
            </div>
        </div>
    );
};

export default CategoryPopCont1;