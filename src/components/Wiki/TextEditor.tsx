import React, {useState} from "react";
import "../../styles/Wiki.css";
import {TextEditorProps} from "../../types/Wiki";
import PostWiki from "./PostWiki";

function TextEditor({dataKey, content, setIsEditorOpen}: TextEditorProps) {
  const [text, setText] = useState(content);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    PostWiki(dataKey, text).then(() => {
      setIsEditorOpen(false);
    });
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
