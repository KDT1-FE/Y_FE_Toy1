import React, { useEffect, useRef, useState } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate, createSearchParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
  onContentChange: (content: string) => void; // 이 콜백 함수를 추가
}

const MarkdownEditor = ({
  content = "",
  editorRef,
  onContentChange,
}: Props) => {
  useEffect(() => {
    if (editorRef.current) {
      // NOTE: 여기서 editorInstance를 어떻게 가져오는지는 Toast UI Editor의 문서를 참조해야 합니다.
      const editorInstance = editorRef.current.getInstance?.(); // 이 부분은 확인이 필요

      if (editorInstance) {
        editorInstance.on("change", () => {
          const updatedContent = editorInstance.getMarkdown();
          onContentChange(updatedContent); // 에디터의 내용이 변경될 때마다 부모 컴포넌트에게 알림
        });
      }
    }
  }, [editorRef, onContentChange]);

  const toolbarItems = [
    // 툴바 옵션 설정
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  return (
    <Editor
      key={content}
      ref={editorRef}
      placeholder="내용을 입력해주세요."
      initialValue={content} // 글 수정 시 사용
      initialEditType="markdown" // wysiwyg & markdown
      previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"} // tab, vertical
      hideModeSwitch
      height="100%"
      theme="" // '' & 'dark'
      usageStatistics={false}
      toolbarItems={toolbarItems}
      useCommandShortcut
      plugins={[colorSyntax]}
    />
  );
};

export default MarkdownEditor;
