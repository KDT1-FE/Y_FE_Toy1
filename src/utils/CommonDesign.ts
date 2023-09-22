import styled from 'styled-components';
export const SubPageContainer = styled.div`
  width: 100%;
  padding: 15px 0 30px 30px;
  @media screen and (max-width: 1024px) {
    padding: 15px 0 30px 0;
    min-height: ${(props) =>
      `calc(100vh - (${props.theme.size.header} + ${props.theme.size.nav} + ${props.theme.size.footer}))`};
  }
`;

export const SmallButtonBlue = styled.button`
  font-family: 'Noto Sans KR';
  width: auto;
  padding: 0 15px;
  cursor: pointer;
  height: 35px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 35px;
  background-color: rgb(50, 103, 177);

  &:hover {
    background-color: #2c5b96;
  }
`;
export const SmallButtonGray = styled.button`
  font-family: 'Noto Sans KR';
  width: auto;
  padding: 0 15px;
  cursor: pointer;
  height: 35px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #222;
  text-align: center;
  line-height: 35px;
  background-color: #ddd;
`;
export const SmallButtonDarkGray = styled.button`
  font-family: 'Noto Sans KR';
  width: auto;
  padding: 0 15px;
  cursor: pointer;
  height: 35px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 35px;
  background-color: #333;
  &:hover {
    background-color: #222;
  }
`;
