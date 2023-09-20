import * as Styled from "./WikiContentStyle";
import * as FormStyled from "./RenderWikiFormStyle";
import { WikiFormProps } from "@/components/wiki/WikiCommonType";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { MarkdownEditor } from "./MarkdownEditor";

export default function WikiForm({
  form,
  onFormChange,
  editorRef,
  parents,
}: WikiFormProps) {
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

      <MarkdownEditor form={form} editorRef={editorRef}></MarkdownEditor>
    </>
  );
}
