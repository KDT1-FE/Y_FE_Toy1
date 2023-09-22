import { useState, useEffect } from 'react';

const useButtonActivate = (...input: InputType[]): boolean => {
  const [buttonActivate, setButtonActivate] = useState(false);

  useEffect((): void => {
    setButtonActivate(
      input.every(el => {
        return el.validationPass === true;
      })
        ? true
        : false,
    );
  }, [input]);

  return buttonActivate;
};

export default useButtonActivate;

interface InputType {
  value: string;
  validationPass: boolean;
}
