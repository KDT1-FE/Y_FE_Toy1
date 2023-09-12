import styled from 'styled-components';

const LoginRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export { LoginLayout, ButtonBox, LoginRoot };
