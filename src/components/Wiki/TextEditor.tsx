import React, {useState} from "react";
import "../../styles/Wiki.css";

function TextEditor() {
  const [text, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
