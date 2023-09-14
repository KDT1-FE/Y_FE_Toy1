import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  handleCommute?: () => void;
}

const CommuteButton = ({ children, className, handleCommute }: Props) => {
  return (
    <button type="button" className={className} onClick={handleCommute}>
      {children}
    </button>
  );
};

export default CommuteButton;
