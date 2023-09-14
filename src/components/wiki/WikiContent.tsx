import WikiEditButton from "./WikiButton";
import * as Styled from "./WikiContentStyle";
import { WikiForm } from "./WikiForm";

type WikiFormType = {
  title: string;
  content: string;
  authorName: string;
  updatedAt: string;
};

type Props = {
  entry: WikiFormType | null;
  form: WikiFormType;
  isEditMode: boolean;
  onFormChange: (key: keyof WikiFormType, value: string) => void;
  onWikiButtonClick: () => void;
  toggleEditMode: () => void;
};

export default function WikiContent({
  entry,
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

  return (
    <Styled.ContentsWrapper>
      {isEditMode || !entry ? (
        <WikiForm form={form} onFormChange={onFormChange} />
      ) : (
        <>
          <Styled.ContentsTitle>
            <Styled.TitleText>{entry.title}</Styled.TitleText>
            <div>
              <span> 최종수정일: {entry.updatedAt}</span>
              <Styled.EditDetails>
                최종수정자: {entry.authorName}
              </Styled.EditDetails>
              <WikiEditButton
                text={"수정"}
                padding={"0.38rem 0.69rem"}
                onClick={onEditButtonClick}
              ></WikiEditButton>
            </div>
          </Styled.ContentsTitle>
          <div>
            <Styled.WikiContent>{entry.content}</Styled.WikiContent>
          </div>
        </>
      )}
    </Styled.ContentsWrapper>
  );
}
