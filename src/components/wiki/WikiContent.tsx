import WikiEditButton from "./WikiButton";
import * as Styled from "./WikiContentStyle";
import { WikiForm } from "./WikiForm";
import { WikiContentProps } from "@/components/wiki/WikiCommonType";

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
}: WikiContentProps) {
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
              {Wiki.updatedAt === ""
                ? `작성일: ${Wiki.createdAt}`
                : `최종수정일: ${Wiki.updatedAt}`}
              <Styled.EditDetails>
                {Wiki.lastUpdatedBy === ""
                  ? `작성자: ${Wiki.authorID}`
                  : `최종수정자: ${Wiki.lastUpdatedBy}`}
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
