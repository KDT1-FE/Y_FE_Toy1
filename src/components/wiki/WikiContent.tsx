import WikiEditButton from "./WikiButton";
import * as Styled from "./WikiContentStyle";
import { WikiForm } from "./WikiForm";
import { Wiki } from "@/pages/wiki/WikiType";
import { Editor } from "@toast-ui/react-editor";

interface Props {
  Wiki: Wiki | null;
  form: Wiki;
  isEditMode: boolean;
  onFormChange: (key: keyof Wiki, value: string) => void;
  onWikiEditButtonClick: () => void;
  onWikiDeleteButtonClick: () => void;
  toggleEditMode: () => void;
  editorRef: React.MutableRefObject<Editor | null>;
  parents: Wiki[];
}

export default function WikiContent({
  Wiki,
  isEditMode,
  onWikiEditButtonClick,
  onWikiDeleteButtonClick,
  toggleEditMode,
  form,
  onFormChange,
  editorRef,
  parents,
}: Props) {
  function onEditButtonClick() {
    onWikiEditButtonClick();
    toggleEditMode();
  }

  if (!Wiki) return null;
  return (
    <Styled.ContentsWrapper>
      {isEditMode ? (
        <WikiForm
          form={form}
          onFormChange={onFormChange}
          editorRef={editorRef}
          parents={parents}
        />
      ) : (
        <>
          <Styled.ContentsTitle>
            <Styled.TitleText>{Wiki.title}</Styled.TitleText>
            <div>
              <span> 최종수정일: {Wiki.updatedAt}</span>
              <Styled.EditDetails>
                최종수정자: {Wiki.authorID}
              </Styled.EditDetails>
              <WikiEditButton
                text={"삭제"}
                padding={"0.38rem 0.69rem"}
                margin={"0 0.31rem 0 0"}
                onClick={onWikiDeleteButtonClick}
              ></WikiEditButton>
              <WikiEditButton
                text={"수정"}
                padding={"0.38rem 0.69rem"}
                onClick={onEditButtonClick}
              ></WikiEditButton>
            </div>
          </Styled.ContentsTitle>

          <div>
            <Styled.WikiContent>{Wiki.content}</Styled.WikiContent>
          </div>
        </>
      )}
    </Styled.ContentsWrapper>
  );
}
