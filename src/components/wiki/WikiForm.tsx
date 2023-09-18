import * as Styled from "./WikiContentStyle";
import * as FormStyled from "./WikiFormStyle";
import { Wiki } from "@/pages/wiki/WikiType";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

type Props = {
  form: Wiki;
  onFormChange: (key: keyof Wiki, value: string) => void;
  editorRef: React.MutableRefObject<Editor | null>;
};

export const WikiForm = ({ form, onFormChange, editorRef }: Props) => {
  return (
    <>
      <Styled.ContentsTitle>
        <Styled.TitleText>
          <FormStyled.Input
            type="text"
            value={form.title}
            onChange={(e) => onFormChange("title", e.target.value)}
            placeholder="제목 입력"
          />
        </Styled.TitleText>
      </Styled.ContentsTitle>

      {/* <FormStyled.Textarea
        value={form.content}
        onChange={(e) => onFormChange("content", e.target.value)}
        placeholder="내용 입력"
      /> */}

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
      ></Editor>
    </>
  );
};
