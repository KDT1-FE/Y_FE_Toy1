import styled from "styled-components";

export const Temp = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto auto auto;
  margin: 1.35rem 5rem;
  gap: 1.5rem;
`
export const GridBox = styled.div`
  width: 100%;
  height: 100%;
`
export const MainTitle = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
`
export const MainCarousel = styled.div`
  grid-row-start: 2;
  grid-row-end: 6;
  position: relative;
`
export const WikiTitle = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;
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
export const GalleryTitle = styled.div`
  grid-row-start: 4;
  grid-row-end: 4;
`
export const GalleryPreview = styled.div`
  grid-row-start: 5;
  grid-row-end: 5;
`