import styled from 'styled-components';

export const CreateAccountLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CreateAccountTitle = styled.h2`
  color: #484aad;
  margin-top: 64px;
`;

export const CreateAccountInputTitle = styled.p`
  margin: 0;
  margin-top: 20px;
`;

export const CreateAccountInput = styled.input`
  border: none;
  border-bottom: 1px solid #96a0ff;
  width: 400px;
  height: 30px;
`;

export const CreateAccountSelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
`;

export const CreateAccountSelect = styled.select`
  width: 100px;
  border-color: #96a0ff;
  text-align: center;
`;

export const CreateAccountApproveBox = styled.div`
  margin-top: 20px;
`;

export const CreateAccountApproveCheck = styled.input`
  margin-right: 25px;
`;

export const CreateAccountBtn = styled.button`
  width: 400px;
  height: 40px;
  border: 2px solid #96a0ff;
  border-radius: 20px;
  background-color: white;

  margin-top: 20px;
`;
