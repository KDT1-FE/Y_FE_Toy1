import { useState, useEffect } from 'react';

interface InputType {
  value: string;
  validationPass: boolean;
}

export const useButtonActivate = (...input: InputType[]): boolean => {
  const [buttonActivate, setButtonActivate] = useState(false);

  useEffect((): void => {
    setButtonActivate(
      input.every(el => {
        return el.validationPass === true;
      })
        ? true
        : false,
    );
  });

  return buttonActivate;
};
