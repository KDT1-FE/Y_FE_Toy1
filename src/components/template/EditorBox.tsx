import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate, useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface ValueState {
  title: string;
  content: string;
  updatedAt: string;
  displayName: string;
}

interface EditorBoxProps {
  setValue: React.Dispatch<React.SetStateAction<ValueState>>;
}

const EditorBox = ({ setValue }: EditorBoxProps) => {
  const editorRef = useRef<any>();

  //페이지 정보
  const { page } = useParams();

  //firebase에 content값 받아서 초기값 설정
  useEffect(() => {
    if (page) {
      const fetchUser = async (uid: string) => {
        const userRef = doc(db, "wiki", uid);
        const userSnap = await getDoc(userRef); // 데이터 스냅 받아오기 - 비동기처리
        if (userSnap.exists()) {
          const { content } = userSnap.data();
          // 초기값 설정
          editorRef.current.getInstance().setMarkdown(content);
        }
        return null;
      };
      fetchUser(page);
    }
  }, []);

  //변경된 content 값 받아서 setValue에 update
  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    setValue((prev) => ({ ...prev, content: data }));
  };

  return (
    <div className="edit_wrap">
      <Editor
        ref={editorRef}
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
