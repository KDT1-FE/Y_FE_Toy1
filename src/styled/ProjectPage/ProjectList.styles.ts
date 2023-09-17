import styled from "styled-components";

// export const Ul = styled.ul`
//   background-color: rgba(150, 160, 255, 0.15);
// `;

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 100px;
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding: 10px;
  align-items: center;
`;
export const WriteText = styled.h2`
  font-size: 40px;
  margin-left: 10px;
  margin-bottom: 20px;
  font-family: RobotoMono;
`;

export const WriteBtn = styled.button`
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
export const TeamName = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 40px;
  margin-top: 40px;
  cursor: pointer; /* 마우스 커서를 포인터 모양으로 지정 */
`;
export const List = styled.div`
  border: 2px solid #484aad;
  border-radius: 10px;
  margin: 30px;
  height: 220px;
`;
export const ListItem = styled.div`
  display: flex;
  margin: 20px;
  padding: 10px;
`;

export const ProjectTitle = styled.p`
  font-size: 25px;
  margin-right: 50px;
  font-family: RobotoMono;
`;

export const Deadline = styled.p`
  font-size: 20px;
  margin-right: 50px;
  font-family: RobotoMono;
`;

export const Member = styled.p`
  font-size: 20px;
  margin-right: 70px;
  font-family: RobotoMono;
`;

export const SVG = styled.div`
  display: flex;
  align-items: center;
  font-family: RobotoMono;
`;
