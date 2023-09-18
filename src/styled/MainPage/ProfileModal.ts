import styled from 'styled-components';

export const ProfileModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 480px;
  height: 380px;
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

export const ButtonBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
`;

export const ProfileInputBtn = styled.button`
  position: absolute;

  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
`;

export const ProfileCameraImg = styled.img`
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 20px;
  background-color: white;
`;

export const ProfileInput = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
