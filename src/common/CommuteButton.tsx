import { MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  backgroundColor: string;
  color: string;
  hoverColor: string;
}

const CommuteButton = ({
  children,
  className,
  onClick,
  backgroundColor,
  color,
  hoverColor,
}: Props) => {
  return (
    <Button
      type="button"
      className={className}
      onClick={onClick}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      color={color}
    >
      {children}
    </Button>
  );
};

const Button = styled.button<{ backgroundColor: string; hoverColor: string }>`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem 1rem;

  border-radius: 1rem;
  border: 1px solid #f2f2f2;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};

  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default CommuteButton;
