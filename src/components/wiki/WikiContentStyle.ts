import styled from "styled-components";

export const ContentsWrapper = styled.div`
  height: 44.75rem;
  flex: 1;
  padding: 1.88rem 2.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-gray);
  border-radius: 0.25rem;
`;

export const ContentsTitle = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 1rem;
  margin-bottom: 1.28rem;

  border-bottom: 1px solid #e4e4e4;
`;
export const TitleText = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-gray);
`;

export const EditDetails = styled.span`
  margin-left: 1.06rem;
  margin-right: 1.06rem;
`;

export const WikiContent = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
