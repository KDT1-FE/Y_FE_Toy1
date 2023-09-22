import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
  width: 100%;

  border-radius: 15px;
  background: var(--color-white);
  border: 1px solid var(--color-light-gray);

  padding: 1.875rem 2.125rem 1.875rem 2.125rem;

  display: flex;
  flex-direction: column;

  &:hover {
    border: 1px solid var(--color-main);
    box-shadow: 0px 4px 4px 0px #00000026;
  }

  @media (min-height: 920px) {
    height: 25vh;
  }
`;

export const WikiCategory = styled.span`
  color: var(--color-gray);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: normal;
  text-align: left;

  margin-bottom: 0.375rem;
`;

export const WikiTitle = styled(WikiCategory)`
  font-weight: 700;
  font-size: 1.125rem;
`;

export const WikiDescription = styled(WikiCategory)`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;
