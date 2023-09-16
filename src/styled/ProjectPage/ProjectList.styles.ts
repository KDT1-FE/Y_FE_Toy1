import styled from "styled-components";

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
  padding: 20px;
`;
export const WriteText = styled.h2`
  font-size: 50px;
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
  font-size: 40px;
  font-weight: bold;
  margin: 30px;
`;
export const List = styled.div`
  border: 1px solid #484aad;
  border-radius: 10px;
`;
export const ListItem = styled.div`
  display: flex;
  margin: 20px;
  padding: 10px;
`;

export const ProjectTitle = styled.p`
  font-size: 30px;
`;

export const Text = styled.p`
  font-size: 20px;
`;
