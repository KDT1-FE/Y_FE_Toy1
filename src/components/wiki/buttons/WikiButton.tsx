import * as Styled from "./WikiButtonStyle";

interface Props {
  text: string;
  margin?: string;
  padding: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

function WikiButton({
  text,
  padding,
  margin,
  isDisabled = false,
  onClick,
}: Props) {
  return (
    <Styled.WikiButton
      $margin={margin}
      $padding={padding}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </Styled.WikiButton>
  );
}

export default WikiButton;
