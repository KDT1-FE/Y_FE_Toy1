import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;

  font-size: 18px;
  font-weight: 700;
  color: var(--color-gray);

  &:focus {
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 550px;
  overflow-y: auto;
  resize: none;

  padding: 0.5rem;

  border: 1px solid var(--color-light-gray);
  border-radius: 0.25rem;

  font-size: 14px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;
