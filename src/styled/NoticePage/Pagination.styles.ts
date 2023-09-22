import styled from 'styled-components';

export const Wrapper = styled.ul`
  display: flex;
  justify-content: space-between;
`;

export const Page = styled.li`
  margin: 0 10px;
`;

export const MoveBtn = styled.button`
  width: 50px;
  height: 30px;
  background-color: #96a0ff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #484aad;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const PageBtn = styled.button`
  width: 30px;
  height: 30px;
  background-color: #96a0ff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #484aad;
  }

  &:active {
    transform: scale(0.9);
  }
`;
