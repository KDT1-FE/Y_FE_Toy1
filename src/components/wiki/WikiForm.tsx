import * as Styled from "./WikiContentStyle";
import * as FormStyled from "./WikiFormStyle";
import { WikiFormProps } from "@/components/wiki/WikiCommonType";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { WikiEditor } from "./WikiEditor";

export const WikiForm = ({
  form,
  onFormChange,
  editorRef,
  parents,
}: WikiFormProps) => {
  return (
    <>
      <Styled.ContentsTitle>
        <Styled.TitleText>
          <FormStyled.Select
            value={form.parentID}
            onChange={(e) => onFormChange("parentID", e.target.value)}
          >
            <option value="">전체</option>
            {parents.map((parent) => (
              <option key={parent.wikiID} value={parent.wikiID}>
                {parent.title}
              </option>
            ))}
          </FormStyled.Select>
          <FormStyled.Input
            type="text"
            value={form.title}
            onChange={(e) => onFormChange("title", e.target.value)}
            placeholder="제목 입력"
          />
        </Styled.TitleText>
      </Styled.ContentsTitle>

      <WikiEditor form={form} editorRef={editorRef}></WikiEditor>
      {/*   <Editor
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
      ></Editor> */}
    </>
  );
};
