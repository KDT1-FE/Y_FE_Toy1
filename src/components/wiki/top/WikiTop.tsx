import WikiTopButton from "../buttons/WikiButton";
import { WikiTopProps } from "../types/WikiCommonType";
import * as Styled from "./WikiTopStyle";

export default function WikiTop({
  title,
  isEditMode,
  isBackButtonVisible,
  onSave,
  onRegister,
  onBack,
}: WikiTopProps) {
  return (
    <Styled.WikiTop>
      <Styled.WikiTitle>{title}</Styled.WikiTitle>
      <div>
        {isBackButtonVisible && (
          <WikiTopButton
            text={"돌아가기"}
            padding={"0.38rem 0.69rem"}
            margin={"0 0.31rem 0 0"}
            onClick={onBack}
          ></WikiTopButton>
        )}
        <WikiTopButton
          text={isEditMode ? "저장" : "등록"}
          padding={"0.38rem 0.69rem"}
          onClick={isEditMode ? onSave : onRegister}
        ></WikiTopButton>
      </div>
    </Styled.WikiTop>
  );
}
