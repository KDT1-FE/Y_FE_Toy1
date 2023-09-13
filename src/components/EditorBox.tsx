import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

interface EditorBoxProps {
  value: string;
  setContent: (value: string) => void;
}

const EditorBox = ({ value, setContent }: EditorBoxProps) => {
  const editorRef = useRef<any>();
  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    console.log(editorInstance);
  }, []);

  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    console.log(data);
    setContent(data);
  };

  return (
    <div className="edit_wrap">
      <Editor
        ref={editorRef}
        initialValue={value}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={false}
        plugins={[colorSyntax]} //글자 색 설정
        language="ko-KR" //언어 설정
        onChange={onChange}
      />
    </div>
  );
};

export default EditorBox;
