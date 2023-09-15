import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 1.88rem;
  margin-right: 1.88rem;
  background-color: var(--color-white);
  width: 15rem;
  height: 44.75rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 0.25rem;
  overflow-x: hidden;
`;

export const CategoryList = styled.ul`
  font-weight: 500;
  font-size: 1rem;
  color: var(--color-gray);
  cursor: pointer;
`;

export const CategoryItem = styled.li`
  padding: 0.5rem 1.88rem;
  padding-right: 0;
  overflow-x: hidden;

  &:hover {
    color: var(--color-main);
    font-weight: 900;
  }
`;
export const EntryList = styled.ul`
  margin-top: 0.5rem;
`;
export const EntryItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  &:hover {
    background-color: rgba(0, 22, 80, 0.05);
    width: calc(100% + 1.88rem);
    color: var(--color-main);
    left: -1.88rem;
  }
  ${CategoryItem}:hover & {
    color: var(--color-gray);
    font-weight: 500;
  }
`;

export const EntryContent = styled.div`
  padding-left: 0.75rem;
  display: flex;
  align-items: center;
`;

export const DepthSymbol = styled.div`
  width: 4.5px;
  height: 4px;
  border-left: 1px solid var(--color-light-gray);
  border-bottom: 1px solid var(--color-light-gray);
  margin-right: 0.59rem;
`;
