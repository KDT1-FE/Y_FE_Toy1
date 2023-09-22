import styled, { keyframes } from 'styled-components'; 

export default function LoadingSpinner() {

  return (
    <LoadingWrap>
      <Spinner></Spinner>
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 61, 145, 0.3);
  border-top: 4px solid #3267B1;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;