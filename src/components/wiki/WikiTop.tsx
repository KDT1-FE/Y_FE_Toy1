import WikiSaveButton from "./WikiButton";
import * as Styled from "./WikiTopStyle";

type Props = {
  title: string;
  isEditMode: boolean;
  onRegister: () => void;
  onSave: () => void;
};

export default function WikiTop({
  title,
  isEditMode,
  onSave,
  onRegister,
}: Props) {
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
