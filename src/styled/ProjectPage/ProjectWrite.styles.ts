import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 100px;
`;
export const WriteDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

// export const WriteBtn = styled.form`
//   width: 130px;
//   height: 40px;
//   font-size: 15px;
//   color: white;
//   background-color: #484aad;
//   border: none;
//   border-radius: 10px;
// `;

export const WriteProject = styled.h2`
  font-size: 50px;
  font-weight: bold;
`;

export const Submit = styled.button`
  border: none;
  width: 130px;
  height: 40px;
  font-size: 15px;
  color: white;
  background-color: #484aad;
  border: none;
  border-radius: 10px;
  cursor: pointer; /* 마우스 커서를 포인터 모양으로 지정 */
`;
export const WriteInput = styled.input`
  border: 2px solid #484aad;
  border-radius: 3px;
  width: 100%;
  height: 70px;
  font-size: 20px;
  padding: 20px;
  margin: 20px;
`;
export const WriteContentInput = styled.textarea`
  border: 2px solid #484aad;
  border-radius: 3px;
  width: 100%;
  height: 200px;
  font-size: 20px;
  padding: 20px;
  margin: 20px;
`;
