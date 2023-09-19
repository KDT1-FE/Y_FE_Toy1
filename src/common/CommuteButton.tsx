import { MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CommuteButton = ({ children, className, onClick }: Props) => {
  return (
    <Button type="button" className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #121212;

  padding: 0.5rem 1rem;
  margin: 0.5rem 0.3rem;

  border-radius: 0.3rem;
  border: 1px solid #f2f2f2;
  background-color: #fff;

  cursor: pointer;

  &:hover {
    background-color: #eeeeee;
  }
`;

export default CommuteButton;
