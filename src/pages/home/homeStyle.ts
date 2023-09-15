import styled from "styled-components";

export const Temp = styled.div`

  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto auto auto;
  margin: 30px 50px;
  gap: 30px;


  div {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }

  .item1 {
    grid-row-start: 1;
    grid-row-end: 1;
    background-color: white;

  }
  .item2 {
    grid-row-start: 2;
    grid-row-end: 6;
    background-color: orange;
  }
  .item3 {
    grid-row-start: 1;
    grid-row-end: 1;
    background-color: white;
  }
  .item4 {
    grid-row-start: 2;
    grid-row-end: 2;
    background-color: blueviolet;
  }
  .item5 {
    background-color: pink;
    grid-row-start: 3;
    grid-row-end: 3;
  }
  .item6 {
    background-color: white;
    grid-row-start: 4;
    grid-row-end: 4;
  }
  .item7 {
    background-color: blanchedalmond;
    grid-row-start: 5;
    grid-row-end: 5;
  }
`;
