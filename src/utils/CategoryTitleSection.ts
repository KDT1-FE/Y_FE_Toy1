import styled from 'styled-components';

export const CategoryTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: block;
    h1 {
      font-size: 25px;
    }
  }
`;
export const CategoryTitle = styled.h1`
  font-size: 28px;
`;
export const BreadCrumb = styled.span`
  font-size: 12px;
  text-align: right;
  color: gray;
`;
