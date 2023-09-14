import * as style from "./buttonStyle";

interface Props {
  text: string;
  margin?: string;
  padding: string;
  normal?: string;
  onClick?: () => void;
}

export default function Button({
  text,
  padding,
  margin,
  normal,
  onClick,
}: Props) {
  return (
    <style.Container
      margin={margin}
      padding={padding}
      normal={normal}
      onClick={onClick}
    >
      {text}
    </style.Container>
  );
}
