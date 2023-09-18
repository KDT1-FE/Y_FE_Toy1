import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-family: 'Inter';
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 18px;
`;

export const InputWrapper = styled.div`
  margin: 22px 0;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.span`
  margin-bottom: 14px;
  font-family: 'Roboto';
  font-size: 1rem;
  line-height: 20px;
  color: #000000;
`;

export const Password = styled.input`
  box-sizing: border-box;
  height: 50px;
  background: #ffffff;
  border: 2px solid #484aad;
  border-radius: 10px;
  padding: 10px;
  outline: none;
`;

export const Subject = styled.input`
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  background: #ffffff;
  border: 2px solid #484aad;
  border-radius: 10px;
  padding: 10px;
  outline: none;
`;

export const Contents = styled.textarea`
  box-sizing: border-box;
  height: 500px;
  border: 2px solid #484aad;
  border-radius: 10px;
  padding: 10px;
  outline: none;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ImageName = styled.input`
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  border: 2px solid #484aad;
  border-radius: 10px;
  padding: 10px;
  outline: none;
`;

export const ImageLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  margin-left: 15px;
  padding: 6px 25px;
  background-color: #484aad;
  border-radius: 10px;
  color: white;
  cursor: pointer;
`;

export const ImageUpload = styled.input`
  display: none;
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SubmitBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: #484aad;
  border: none;
  border-radius: 50px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
`;

export const CancelBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: #484aad;
  border: none;
  border-radius: 50px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
`;

export const ErrorDiv = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 10px;
  margin-left: 5px;
`;
