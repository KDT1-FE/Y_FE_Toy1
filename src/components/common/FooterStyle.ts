import styled from "styled-components";

export const FooterWrap = styled.div`
  background-color: var(--color-main);
  padding: 20px 80px;
  color: var(--color-white);
`;

export const FooterTop = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterTopLeft = styled.div`
  & > span {
    font-size: 1.5rem;
  }
  & > span:first-child {
    padding: 0 10px;
    border: 0.5px solid var(--color-white);
  }
`;

export const FooterTopMid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > p {
    margin: 0 10px;
  }
`;

export const FooterTopRight = styled.div`
  & > a {
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  & img {
    color: white;
    width: 100%;
    vertical-align: bottom;
  }
`;

export const FooterBottom = styled.div`
  border: 1px solid yellow;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
