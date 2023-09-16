import styled from "styled-components";

export const Ul = styled.ul`
  background-color: rgba(150, 160, 255, 0.3);
`;

export const Container = styled.div`
  max-height: 1200px;
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
  margin: 10px;
  font-family: RobotoMono;
`;

export const WriteBtn = styled.button`
  width: 150px;
  height: 50px;
  font-size: 15px;
  color: white;
  background-color: #484aad;
  border: none;
  border-radius: 10px;
`;
export const TeamName = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 40px;
  margin-top: 40px;
  font-family: RobotoMono;
`;
export const List = styled.div`
  border: 2px solid #484aad;
  border-radius: 10px;
  margin: 30px;
`;
export const ListItem = styled.div`
  display: flex;
  margin: 20px;
  padding: 10px;
`;

export const ProjectTitle = styled.p`
  font-size: 30px;
  margin-right: 50px;
`;

export const Deadline = styled.p`
  font-size: 20px;
  margin-right: 50px;
`;

export const Member = styled.p`
  font-size: 20px;
  margin-right: 70px;
`;
