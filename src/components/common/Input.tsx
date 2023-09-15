import * as style from "./InputStyle";

interface Props {
  type: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  forwardedRef?: React.Ref<HTMLInputElement>;
  value?: string;
}

export default function Input({
  type,
  id,
  onChange,
  onKeyPress,
  placeholder,
  forwardedRef,
  value,
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
    />
  );
}
