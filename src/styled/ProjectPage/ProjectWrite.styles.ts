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
  font-size: 40px;
  font-weight: bold;
  font-family: RobotoMono;
  margin-left: 10px;
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
  font-family: RobotoMono;
`;
export const WriteInput = styled.input`
  border: 2px solid #484aad;
  border-radius: 3px;
  width: 100%;
  height: 70px;
  font-size: 15px;
  padding: 20px;
  margin: 20px;
  &:hover {
    border-color: rgba(150, 160, 255, 0.5);
    background-color: rgba(150, 160, 255, 0.1);
  }
  font-family: RobotoMono;
`;
export const WriteContentInput = styled.textarea`
  border: 2px solid #484aad;
  border-radius: 3px;
  width: 100%;
  height: 200px;
  font-size: 15px;
  padding: 20px;
  margin: 20px;
  &:hover {
    border-color: rgba(150, 160, 255, 0.5);
    background-color: rgba(150, 160, 255, 0.1);
  }
  font-family: RobotoMono;
`;
export const ProgressDiv = styled.div`
  display: flex;
  align-items: center;
  font-family: RobotoMono;
  border: 1px solid;
  border-radius: 20px;
  margin-left: 20px;
  padding: 6px;

  &.inProgress {
    width: 78px;
    border-color: #53e56b;
  }
  /* "완료" 상태에 대한 스타일 */
  &.completed {
    width: 68px;
    border-color: #ff0000;
  }
`;
export const Ing = styled.p`
  font-size: 14px;
  width: 78px;
  &.inProgress {
    color: #53e56b;
  }
  &.completed {
    color: #ff0000;
  }
  cursor: pointer;
`;
export const ProgressImg = styled.img`
  padding-left: 5px;
  cursor: pointer;
`;
export const WriteEx = styled.div`
  display: flex;
  align-items: center;
`;
export const Ex = styled.p`
  font-size: 12px;
  margin-left: 10px;
  color: #9d9797;
`;
