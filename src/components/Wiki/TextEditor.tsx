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
    <div className="TextEditorContainer">
      <form onSubmit={onSubmit}>
        <textarea onChange={onChange} value={text} />
        <button type="submit">submit</button>
      </form>
      <p>{text}</p>
    </div>
  );
}

export default TextEditor;
