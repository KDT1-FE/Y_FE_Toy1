import { Link } from "react-router-dom";
import styled from "styled-components";

export const Temp = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto auto auto;
  margin: 1.4rem 5rem;
  gap: 30px;
`;
export const GridBox = styled.div`
  width: 100%;
  height: 100%;
`;
export const Item1 = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
`;
export const Item2 = styled.div`
  grid-row-start: 2;
  grid-row-end: 6;
  position: relative;
`;
export const Item3 = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
`;
export const Item4 = styled.div`
  grid-row-start: 2;
  grid-row-end: 2;
  background-color: blueviolet;
`;
export const Item5 = styled.div`
  background-color: pink;
  grid-row-start: 3;
  grid-row-end: 3;
`;
export const Item6 = styled.div`
  grid-row-start: 4;
  grid-row-end: 4;
`;
export const Item7 = styled.div`
  grid-row-start: 5;
  grid-row-end: 5;
`;

export const MainTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainTitle = styled.div`
  color: var(--color-dark-gray);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: normal;
  text-align: left;
`;

export const SideSkeleton = styled.div`
  width: 100%;
  height: 168px;
  border-radius: 15px;
  color: rgba(0, 0, 0, 0);
  background-image: linear-gradient(
    100deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1)
  );
  background-size: 400% 100%;
  animation: skeleton-loading 7s linear infinite;

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const MoreBtn = styled(Link)`
  color: var(--color-gray);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: normal;

  &:hover {
    text-decoration: underline;
  }
`;
