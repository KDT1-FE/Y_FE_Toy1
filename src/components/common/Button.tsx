import * as style from "./buttonStyle";

interface Props {
  text: string;
  margin?: string;
  padding: string;
  normal?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  text,
  padding,
  margin,
  normal,
  disabled,
  onClick,
}: Props) {
  return (
    <style.Container
      disabled={disabled}
      margin={margin}
      padding={padding}
      normal={normal}
      onClick={onClick}
    >
      {text}
    </style.Container>
  );
}
