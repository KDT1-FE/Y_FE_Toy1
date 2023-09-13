import React, {useState} from "react";
import "../../styles/Wiki.css";

function TextEditor() {
  const [text, setText] = useState("");

  const onChange = (e: any) => {
    setText(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(text);
    // firebase upload function 넣기 (수정 데이터 전송)
    // 전송 이후 페이지 새로고침
  };

  return (
    <div className="TextEditorWrap">
      <form id="editor-form" onSubmit={onSubmit}>
        <textarea onChange={onChange} value={text} />
        <button
          className="WikiButton"
          type="submit"
          style={{backgroundColor: "#5086ED"}}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default TextEditor;
