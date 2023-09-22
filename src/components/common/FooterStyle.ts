import styled from "styled-components";

export const FooterWrap = styled.div`
  margin-top: 2.5rem;
  background-color: var(--color-main);
  padding: 0.3125rem 5rem;
  color: var(--color-white);
  opacity: 20%;
`;

export const FooterTop = styled.div`
  padding: 0.625rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterTopLeft = styled.div`
  & > span {
    font-size: 1rem;
    letter-spacing: -0.05rem;
  }
`;

export const FooterTopMid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > a > p {
    margin: 0 0.625rem;
    font-size: 0.8rem;
    letter-spacing: -0.04rem;
  }

  & > a > p:hover {
    border-bottom: 1px solid #fff;
  }
`;

export const FooterTopRight = styled.div`
  & > a {
    display: inline-block;
    width: 1.875rem;
    height: 1.875rem;
  }

  & img {
    color: white;
    width: 100%;
    vertical-align: bottom;
  }
`;

export const FooterBottom = styled.div`
  border: 0.0625rem solid yellow;
  padding: 0.625rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
