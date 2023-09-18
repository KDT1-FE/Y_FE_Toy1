import { useState } from 'react';

interface InputType {
  value: string;
  validationPass: boolean;
}

const useInput = (
  target: string,
  initial: InputType,
  password?: InputType,
): [InputType, React.ChangeEventHandler<HTMLInputElement>] => {
  const [input, setInput] = useState(initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (target === 'email') {
      setInput({
        value: e.target.value,
        validationPass: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
          e.target.value,
        ),
      });
    }

    if (target === 'password') {
      setInput({ value: e.target.value, validationPass: /^[A-Za-z0-9]{6,12}$/.test(e.target.value) });
    }

    if (target === 'passwordConfirm') {
      if (password) {
        setInput({ value: e.target.value, validationPass: e.target.value === password.value });
      }
    }

    if (target === 'name') {
      setInput({ value: e.target.value, validationPass: (input.validationPass = e.target.value.length > 1) });
    }
  };

  return [input, handleChange];
};

export default useInput;
