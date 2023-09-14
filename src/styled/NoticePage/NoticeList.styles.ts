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
  text-align: center;
`;

export const Footer = styled.div`
  width: 56%;
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;

export const Pagination = styled.div``;

export const WriteBtn = styled.button`
  width: 120px;
  height: 52px;
  background-color: #484aad;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  a {
    color: white;
    text-decoration: none;
  }
`;
