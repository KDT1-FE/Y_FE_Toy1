import styled from "styled-components";

export const Temp = styled.div`
  // border: 1px solid green;
  padding: 1rem 0;
  border: 0.06rem solid #e6e6e6;
  border-radius: 0.94rem;
  background-color: #fff;
  min-width: 15rem;
  height: 44.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AddList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.4rem 1rem;
  color: #4a4a4a;
  font-weight: medium;
  font-size: 1rem;
  line-height: normal;
  text-align: left;
  &:hover,
  &.active {
    font-weight: bold;
  }
  margin-top: 1rem;
  background: #0016500c;
`;

export const ListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  user-select: none;
`;

export const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0.4rem 1rem;
  color: #4a4a4a;
  font-weight: medium;
  font-size: 1rem;
  line-height: normal;
  text-align: left;
  margin-left: 0.5rem;
  user-select: none;
  &:hover,
  &.active {
    background: #0016500c;
    font-weight: bold;
  }
  &.bold {
    font-weight: bold;
    margin-left: 0;
  }
  &.add-list {
    background: #0016500c;
    font-weight: bold;
  }
`;

export const Arrow = styled.span`
  height: 100%;
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
