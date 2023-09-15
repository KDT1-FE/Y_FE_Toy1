import styled from "styled-components";

export const Temp = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto auto auto;
  margin: 30px 50px;
  gap: 30px;
`
export const GridBox = styled.div`
  width: 100%;
  height: 100%;
`
export const Item1 = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  background-color: white;
`
export const Item2 = styled.div`
  grid-row-start: 2;
  grid-row-end: 6;
  background-color: orange;
`
export const Item3 = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
  background-color: white;
`
export const Item4 = styled.div`
  grid-row-start: 2;
  grid-row-end: 2;
  background-color: blueviolet;
`
export const Item5 = styled.div`
  background-color: pink;
  grid-row-start: 3;
  grid-row-end: 3;
`
export const Item6 = styled.div`
  background-color: white;
  grid-row-start: 4;
  grid-row-end: 4;
`
export const Item7 = styled.div`
  background-color: blanchedalmond;
  grid-row-start: 5;
  grid-row-end: 5;
`