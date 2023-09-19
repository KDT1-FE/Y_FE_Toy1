import * as Styled from "./WikiButtonStyle";

interface Props {
  text: string;
  margin?: string;
  padding: string;
  onClick?: () => void;
}

function WikiButton({ text, padding, margin, onClick }: Props) {
  return (
    <Styled.WikiButton $margin={margin} $padding={padding} onClick={onClick}>
      {text}
    </Styled.WikiButton>
  );
}

export default WikiButton;
