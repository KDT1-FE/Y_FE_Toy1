import styled from "styled-components";

interface isSelectedWiki {
  selected: boolean;
}

export const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${(props) => (props.$isVisible ? "block" : "none")};
  padding-top: 1.88rem;
  margin-right: 1.88rem;
  background-color: var(--color-white);
  width: 15rem;
  height: 44.75rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 0.94rem;
  overflow-x: hidden;
`;

export const WikiList = styled.ul`
  font-size: 1rem;
  color: var(--color-gray);
  cursor: pointer;
`;

export const WikiItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.88rem;
  padding-right: 0;
  overflow: hidden;
  height: 3rem;

  &:hover {
    background-color: rgba(0, 22, 80, 0.05);
  }
`;

export const ParentWikiWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ChildWikiWrapper = styled.div``;

export const WikiTitle = styled.span<isSelectedWiki>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) =>
    props.selected ? "var(--color-main)" : "var(--color-gray)"};
  font-weight: ${(props) => (props.selected ? 600 : 500)};
`;

export const ChildWikiTitle = styled(WikiTitle)`
  && {
    padding-right: 2.5rem;
  }
`;

export const DepthSymbol = styled.div`
  width: 4.5px;
  height: 4px;
  border-left: 1px solid var(--color-light-gray);
  border-bottom: 1px solid var(--color-light-gray);
  margin-right: 0.59rem;
`;

export const ArrowIcon = styled.div`
  cursor: pointer;
  font-size: 1rem;
  color: #b4b4b4;
  margin-right: 1rem;
  margin-left: 1rem;
`;
