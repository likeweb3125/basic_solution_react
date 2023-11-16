import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { enum_api_uri } from "../../config/enum";
import * as CF from "../../config/function";
import { confirmPop } from "../../store/popupSlice";
import InputBox from "../../components/component/admin/InputBox";
import ConfirmPop from "../../components/popup/ConfirmPop";
import Editor from "../../components/component/Editor";
import SelectBox from "../../components/component/admin/SelectBox";


const MaintWrite = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const maint_detail = enum_api_uri.maint_detail;
    const maint_create = enum_api_uri.maint_create;

    const user = useSelector((state)=>state.user);
    const popup = useSelector((state)=>state.popup);
    const common = useSelector((state)=>state.common);
    const [confirm, setConfirm] = useState(false);

    const [boardData, setBoardData] = useState({});
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [filesData, setFilesData] = useState([]);
    const [deltFiles, setDeltFiles] = useState([]);
    const [showRaw, setShowRaw] = useState(false);
    const [rawHtml, setRawHtml] = useState('');


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);


    //인풋값 변경시
    const onInputChangeHandler = (e) => {
        const id = e.currentTarget.id;
        const val = e.currentTarget.value;

        let newData = {...boardData};
            newData[id] = val;
            
        setBoardData(newData);
    };


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


    //첨부파일 등록
    const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
        multiple: true, // 여러 개의 파일 선택 가능하도록 설정
        onDrop: acceptedFiles => {
            setFiles(prevFiles => [
                ...prevFiles,
                ...acceptedFiles.map((file,i) => ({
                    id: uuidv4(), // 고유한 식별자로 파일 이름 사용
                    original_name: file.name,
                }))
            ]);

            setFilesData(acceptedFiles);
        }
    });


    //첨부파일 삭제버튼 클릭시
    const handleRemove = (i) => {
        let newList = [...files];
            newList.splice(i,1);
        setFiles(newList);
    };


    //글 등록버튼 클릭시
    const submitClickHandler = () => {
        let cont;
        if(showRaw){
            cont = rawHtml;
        }else{
            cont = content.replace(/<p><br><\/p>/g, "");
        }

        if(!boardData.subject){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'제목을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else if(!cont){
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt:'내용을 입력해주세요.',
                confirmPopBtn:1,
            }));
            setConfirm(true);
        }else{
            // submitHandler();
        }
    };


    //글 등록하기
    const submitHandler = () => {
        const formData = new FormData();

        //첨부파일
        if(filesData.length > 0){
            filesData.forEach((file) => {
                formData.append("b_file", file);
            });
        }else{
            formData.append("b_file", "");
        }

        let cont;
        if(showRaw){
            cont = rawHtml;
        }else{
            cont = content;
        }

        formData.append("category", user.maintName);
        formData.append("name", "");
        formData.append("password", "");
        formData.append("subject", boardData.subject);
        formData.append("contents", cont);

        axios.post(maint_create, formData, {
            headers: {
                Authorization: `Bearer ${user.loginUser.accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            if (res.status === 200) {
                navigate(-1);
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


    return(<>
        <div className="page_admin_board">
            <div className="content_box">
                <div className="tit">
                    <h3>
                        <b>서비스 관리 및 유지보수 시스템</b>
                    </h3>
                </div>
                <div className="board_section">
                    <div className="board_write">
                        <div className="tbl_wrap2">
                            <table>
                                <caption>게시판 작성 테이블</caption>
                                <colgroup>
                                    <col style={{width: "140px"}}/>
                                    <col style={{width: "auto"}}/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>제목</th>
                                        <td>
                                            <InputBox 
                                                type={`text`}
                                                placeholder={`제목을 입력해주세요.`}
                                                countShow={true}
                                                countMax={40}
                                                count={boardData.subject ? boardData.subject.length : 0}
                                                value={boardData.subject || ""}
                                                onChangeHandler={onInputChangeHandler}
                                                id={`subject`}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
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
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>파일첨부</th>
                                        <td>
                                            <div className="file_box2">
                                                <div className="input_file">
                                                    <div {...getRootProps1({className: 'dropzone'})}>
                                                        <input {...getInputProps1({className: 'blind'})} />
                                                        <label>
                                                            <b>파일을 마우스로 끌어 오세요.</b>
                                                            <strong>파일선택</strong>
                                                        </label>
                                                    </div>
                                                </div>
                                                {files.length > 0 &&
                                                    <ul className="file_txt">
                                                        {files.map((cont,i)=>{
                                                            return(
                                                                <li key={i}>
                                                                    <span>{cont.original_name}</span>
                                                                    <button type="button" className="btn_file_remove" 
                                                                        onClick={() => {
                                                                            let id;
                                                                            if(cont.idx){
                                                                                id = cont.idx;
                                                                            }else{
                                                                               id = null; 
                                                                            }
                                                                            handleRemove(i,id);
                                                                        }}
                                                                    >파일삭제</button>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="form_btn_wrap">
                            <Link to={-1} className="btn_type3">취소</Link>
                            <button type="button" className="btn_type4" onClick={submitClickHandler}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default MaintWrite;