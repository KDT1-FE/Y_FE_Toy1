import styled from 'styled-components';

export const ProfileModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 480px;
  height: 320px;
  border-radius: 20px;
  background-color: #dfe3ff;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 16px 16px;
`;

export const ProfileBtn = styled.button`
  background-color: transparent;
  border: none;
`;

export const CloseImg = styled.img`
  width: 32px;
`;

export const ProfileModalHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileModalHeaderText = styled.span`
  font-size: 24px;
`;

export const ProfileModalCloseBtn = styled.button`
  background-color: transparent;
  border: none;
`;

export const ProfileInfoBox = styled.div`
  display: flex;
`;

export const SingleButtonBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DuoButtonBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
