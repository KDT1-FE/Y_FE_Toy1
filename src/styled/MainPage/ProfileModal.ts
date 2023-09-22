import styled from 'styled-components';

export const ProfileModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 480px;
  height: 410px;
  border-radius: 20px;
  background-color: #dfe3ff;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  padding: 16px 16px;
`;

export const ProfileBtn = styled.button`
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export const CloseImg = styled.img`
  width: 20px;
`;

export const ProfileModalHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileModalCloseBtn = styled.button`
  background-color: transparent;
  border: none;
`;

export const ProfileInfoBox = styled.div`
  display: flex;
  margin-bottom: 15px;
  gap: 20px;

  align-items: center;
`;

export const ButtonBox = styled.div`
  width: 100%;
  margin-top: auto;

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
  position: absolute;

  right: 0;
  top: 60px;
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

export const ProfileInfoText = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const ProfileInfoEmail = styled.div`
  font-size: 16px;
`;

export const Btn = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  border: none;
  width: 144px;
  height: 40px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

export const PositionSelect = styled.select`
  width: 80px;
  padding: 1px;
  height: 24px;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid #96a0ff;
  border-radius: 5px;
  text-align: center;
`;

export const InputText = styled.input`
  border: 2px solid #96a0ff;
  border-radius: 5px;
  padding: 1px;
  font-size: 16px;
  height: 24px;
  text-align: center;
`;
