import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";


export const Editor = (props) => {

    return (<>
        <EditorToolbar 
            onClickRaw={props.onClickRaw}
        />
        <ReactQuill
            theme="snow"
            value={props.value}
            onChange={props.onChangeHandler}
            // placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
        />
        
    </>);
};

export default Editor;