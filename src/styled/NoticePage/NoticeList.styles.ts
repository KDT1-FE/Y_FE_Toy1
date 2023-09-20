import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 100px auto;
`;

export const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SearchWrapper = styled.div`
  border: 1px solid black;
  position: relative;
`;

export const SearchInput = styled.input`
  box-sizing: border-box;
  width: 776px;
  height: 52px;
  font-size: 16px;
  line-height: 24px;
  padding: 15px;
  border-radius: 10px;
  outline: none;
  background-color: rgba(150, 160, 255, 0.1);
  border: 3px solid #96a0ff;
  color: black;
`;

export const SearchButton = styled.button`
  width: 94px;
  height: 52px;
  color: white;
  border: none;
  background-color: #484aad;
  border-radius: 10px;

  cursor: pointer;
`;

export const SearchNoResultMessage = styled.div`
  text-align: center;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
`;

export const TableTop = styled.div`
  border-top: 3px solid gray;
  margin-top: 20px;
`;

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  cursor: pointer;

  &:hover {
    background-color: rgba(150, 160, 255, 0.1);
  }
`;

export const ColumnHeaderBasic = styled.div`
  width: 15%;
  text-align: center;
`;

export const ColumnHeaderSubject = styled.div`
  width: 70%;
  margin-left: 50px;
  text-align: start;
`;

export const Footer = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 50px;
`;

export const PaginationDiv = styled.div`
  margin: 0 auto;
`;

export const WriteBtn = styled.button`
  position: absolute;
  right: 0;
  background-color: #484aad;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 18px;
  }
`;
