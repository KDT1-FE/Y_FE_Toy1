import WikiEditButton from "./WikiButton";
import * as Styled from "./WikiContentStyle";
import { WikiForm } from "./WikiForm";
import { Wiki } from "@/pages/wiki/WikiType";

interface Props {
  Wiki: Wiki | null;
  form: Wiki;
  isEditMode: boolean;
  onFormChange: (key: keyof Wiki, value: string) => void;
  onWikiButtonClick: () => void;
  toggleEditMode: () => void;
}

export default function WikiContent({
  Wiki,
  isEditMode,
  onWikiButtonClick,
  toggleEditMode,
  form,
  onFormChange,
}: Props) {
  function onEditButtonClick() {
    onWikiButtonClick();
    toggleEditMode();
  }

  if (!Wiki) return null;
  return (
    <Styled.ContentsWrapper>
      {isEditMode ? (
        <WikiForm form={form} onFormChange={onFormChange} />
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
