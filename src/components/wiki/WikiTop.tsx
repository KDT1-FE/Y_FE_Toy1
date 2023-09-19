import WikiSaveButton from "./WikiButton";
import { WikiTopProps } from "./WikiCommonType";
import * as Styled from "./WikiTopStyle";

export default function WikiTop({
  title,
  isEditMode,
  onSave,
  onRegister,
}: WikiTopProps) {
  return (
    <Styled.WikiTop>
      <Styled.WikiTitle>{title}</Styled.WikiTitle>
      <WikiSaveButton
        text={isEditMode ? "저장" : "등록"}
        padding={"0.38rem 0.69rem"}
        onClick={isEditMode ? onSave : onRegister}
      ></WikiSaveButton>
    </Styled.WikiTop>
  );
}
