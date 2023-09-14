import * as style from "./buttonStyle";

interface Props {
  text: string;
  margin?: string;
  padding: string;
}

export default function Button({ text, padding, margin }: Props) {
  return (
    <style.Container margin={margin} padding={padding}>
      {text}
    </style.Container>
  );
}
