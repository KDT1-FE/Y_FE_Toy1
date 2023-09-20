import React, {useState} from "react";
import "../../styles/wiki/wiki.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {TextEditorProps} from "../../types/Wiki";
import PostWiki from "./PostWiki";

function TextEditor({
  dataKey,
  content,
  setContent,
  setIsEditorOpen,
}: TextEditorProps) {
  const [text, setText] = useState(content);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    PostWiki(dataKey, text).then(() => {
      setIsEditorOpen(false);
      setContent(text);
    });
  };

  return (
    <div className="TextEditorWrap">
      <ReactMarkdown
        className="markdown-body MarkdownBodyEditor"
        remarkPlugins={[remarkGfm]}
        rawSourcePos
        rehypePlugins={[rehypeRaw as any]}
      >
        {text}
      </ReactMarkdown>
      <form className="EditorForm" onSubmit={onSubmit}>
        <textarea className="TextArea" onChange={onChange} value={text} />
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
