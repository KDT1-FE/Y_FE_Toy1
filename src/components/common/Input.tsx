import * as style from "./InputStyle";

interface Props {
  type: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  forwardedRef?: React.Ref<HTMLInputElement>;
  value?: string;
  width: string;
}

export default function Input({
  type,
  id,
  onChange,
  onKeyPress,
  placeholder,
  forwardedRef,
  value,
  width,
}: Props) {
  return (
    <style.Input
      type={type}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      ref={forwardedRef}
      value={value}
      width={width}
    />
  );
}
