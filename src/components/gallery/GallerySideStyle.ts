import styled from "styled-components";

export const GallerySide = styled.div`
  border: 1px solid green;
  padding-top: 1.88rem;
  margin-right: 1.88rem;
  border: 0.06rem solid var(--color-light-gray);
  border-radius: 0.25rem;
  background-color: var(--color-white);
  min-width: 15rem;
  height: 44.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > #add-sub {
    border: 1px solid red;
  }
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
    // font-weight: bold;
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
  // justify-content: space-between;
  height: 3rem;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 8px 0;
  color: var(--color-gray);
  font-weight: 500;
  font-size: 1rem;
  line-height: normal;
  text-align: left;
  padding-left: 2.63rem;
  user-select: none;

  &:hover {
    background: #0016500c;
  }

  &.active {
    background: #0016500c;
  }

  &.bold {
    justify-content: space-between;
    font-weight: 500;
    padding-left: 1.88rem;
  }

  &.add-list {
    background: #0016500c;
    font-weight: 500;
  }
`;

export const icon = styled.div`
  width: 4.5px;
  height: 4px;
  border-left: 1px solid var(--color-light-gray);
  border-bottom: 1px solid var(--color-light-gray);
  margin-right: 0.59rem;
`;

export const Arrow = styled.span`
  // height: 100%;
`;

export const ButtonWrap = styled.div`
  margin-bottom: 1.88rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowIcon = styled.div`
  cursor: pointer;
  font-size: 1rem;
  color: #b4b4b4;
  margin-right: 1rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
