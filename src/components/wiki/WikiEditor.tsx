import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Wiki } from "./WikiCommonType";

type WikiEditorProps = {
  form: Wiki;
  editorRef: React.MutableRefObject<Editor | null>;
};

export const WikiEditor = ({ form, editorRef }: WikiEditorProps) => {
  return (
    <Editor
      height="550px"
      ref={editorRef}
      initialValue={form.content ? form.content : " "}
      previewStyle="vertical"
      hideModeSwitch={true}
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["table", "link"],
        ["code", "codeblock"],
      ]}
      language="ko-KR"
    ></Editor>
  );
};
